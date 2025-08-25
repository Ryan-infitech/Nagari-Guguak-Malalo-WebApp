'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CalendarProps {
  mode?: 'single' | 'range';
  selected?: Date | { from: Date; to?: Date };
  onSelect?: (date: Date | { from: Date; to?: Date } | undefined) => void;
  initialFocus?: boolean;
  defaultMonth?: Date;
  numberOfMonths?: number;
  className?: string;
  disabled?: (date: Date) => boolean;
}

function Calendar({ className, selected, onSelect, disabled, defaultMonth }: CalendarProps) {
  // Helper function to get initial date
  const getInitialDate = () => {
    if (defaultMonth) return defaultMonth;
    if (!selected) return new Date();

    if (selected instanceof Date) {
      return selected;
    }

    return selected.from;
  };

  const [currentDate, setCurrentDate] = React.useState(getInitialDate());

  // Update currentDate when defaultMonth changes
  React.useEffect(() => {
    if (defaultMonth) {
      setCurrentDate(defaultMonth);
    }
  }, [defaultMonth]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  const currentDateIter = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDateIter));
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const selectDate = (date: Date) => {
    if (disabled && disabled(date)) {
      return;
    }
    onSelect?.(date);
  };

  // Helper function to check if a date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selected) return false;

    if (selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }

    // Handle range selection
    if (selected.from && date.toDateString() === selected.from.toDateString()) {
      return true;
    }

    if (selected.to && date.toDateString() === selected.to.toDateString()) {
      return true;
    }

    // Check if date is within range
    if (selected.from && selected.to) {
      const checkDate = date.getTime();
      return checkDate >= selected.from.getTime() && checkDate <= selected.to.getTime();
    }

    return false;
  };

  return (
    <div className={cn('p-3', className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth(-1)}
          className="h-7 w-7 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {monthNames[month]} {year}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth(1)}
          className="h-7 w-7 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isSelected = isDateSelected(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isDisabled = disabled ? disabled(date) : false;

          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                'h-9 w-9 p-0 font-normal',
                !isCurrentMonth && 'text-muted-foreground opacity-50',
                isSelected &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                isToday && !isSelected && 'bg-accent text-accent-foreground',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
              onClick={() => selectDate(date)}
              disabled={isDisabled}
            >
              {date.getDate()}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
