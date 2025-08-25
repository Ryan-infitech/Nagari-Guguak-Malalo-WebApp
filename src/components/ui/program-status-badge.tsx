/**
 * Program Status Badge Component
 * Badge untuk menampilkan status program dengan auto-calculation berdasarkan tanggal
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import umkmProgramService from '@/api/services/umkmProgram.service';

interface ProgramStatusBadgeProps {
  startDate: string | Date;
  endDate: string | Date;
  manualStatus?: string;
  showLabel?: boolean;
  className?: string;
}

export const ProgramStatusBadge: React.FC<ProgramStatusBadgeProps> = ({
  startDate,
  endDate,
  manualStatus,
  showLabel = true,
  className = '',
}) => {
  // Calculate the actual status based on dates
  const actualStatus = umkmProgramService.calculateAutoStatus(startDate, endDate, manualStatus);

  const statusLabel = umkmProgramService.getStatusLabel(actualStatus);
  const statusColor = umkmProgramService.getStatusColor(actualStatus);

  return (
    <Badge className={`${statusColor} ${className}`} variant="secondary">
      {showLabel ? statusLabel : actualStatus}
    </Badge>
  );
};

export default ProgramStatusBadge;
