/**
 * Simple device fingerprinting utility
 */

/**
 * Generates a simple device fingerprint based on browser and device information
 * This is not a secure fingerprint but enough for basic registration tracking
 */
export function generateDeviceFingerprint(): string {
  try {
    // Gather device information
    const screenInfo = `${window.screen.height}_${window.screen.width}_${window.screen.colorDepth}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const languages = navigator.languages ? navigator.languages.join(',') : navigator.language;
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    const cpuCores = navigator.hardwareConcurrency || 'unknown';

    // Combine all info
    const baseFingerprint = `${screenInfo}_${timeZone}_${languages}_${platform}_${cpuCores}_${userAgent}`;

    // Create a simple hash of the fingerprint
    let hash = 0;
    for (let i = 0; i < baseFingerprint.length; i++) {
      const char = baseFingerprint.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    return `fp_${Math.abs(hash).toString(16)}`;
  } catch (error) {
    // Fallback to a random identifier if fingerprinting fails
    console.error('Error generating device fingerprint:', error);
    return `fp_${Math.random().toString(36).substring(2, 15)}`;
  }
}

/**
 * Checks if user already registered for a program
 */
export function checkProgramRegistrationStatus(programId: string): boolean {
  try {
    const fingerprint = generateDeviceFingerprint();
    const registrationsKey = 'umkm_program_registrations';
    const storedRegistrations = localStorage.getItem(registrationsKey);

    if (!storedRegistrations) return false;

    const registrations = JSON.parse(storedRegistrations);

    return registrations.some(
      (registration: any) =>
        registration.programId === programId && registration.fingerprint === fingerprint
    );
  } catch (error) {
    console.error('Error checking registration status:', error);
    return false;
  }
}

/**
 * Records a program registration
 */
export function recordProgramRegistration(programId: string): void {
  try {
    const fingerprint = generateDeviceFingerprint();
    const registrationsKey = 'umkm_program_registrations';
    const storedRegistrations = localStorage.getItem(registrationsKey);
    const registrations = storedRegistrations ? JSON.parse(storedRegistrations) : [];

    registrations.push({
      programId,
      fingerprint,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem(registrationsKey, JSON.stringify(registrations));
  } catch (error) {
    console.error('Error recording program registration:', error);
  }
}
