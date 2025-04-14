import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const colorOptions = [
  { name: 'Light Yellow', value: '#FFFACD' },
  { name: 'Light Peach', value: '#FDD9B5' },
  { name: 'Light Taupe', value: '#D1B3C4' },
  { name: 'Light Coral', value: '#F4C7C3' },
  { name: 'Light Pink', value: '#F8D7E0' },
  { name: 'Pale Pink', value: '#F9B4C1' },
  { name: 'Light Lavender Pink', value: '#F4C2D7' },
  { name: 'Lavender', value: '#D7BDE2' },
  { name: 'Soft Violet', value: '#C3BCE9' },
  { name: 'Periwinkle', value: '#D0BBFF' },
  { name: 'Light Blue', value: '#ADD8E6' },
  { name: 'Light Cyan', value: '#B2D8D8' },
  { name: 'Light Mint Green', value: '#D6F5D6' },
  { name: 'Pastel Green', value: '#C1E1C1' },
  { name: 'Pastel Yellow', value: '#FDFD96' },
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-full justify-start text-left font-normal h-10'
        >
          <div className='flex items-center gap-2'>
            <div
              className='h-4 w-4 rounded-full'
              style={{ backgroundColor: value }}
            />
            <span>Color seleccionado</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64'>
        <div className='grid grid-cols-4 gap-2'>
          {colorOptions.map((color) => (
            <div
              key={color.name}
              className='flex items-center justify-center'
              onClick={() => onChange(color.value)}
            >
              <div
                className={cn(
                  'h-8 w-8 rounded-full cursor-pointer flex items-center justify-center border-2',
                  value === color.value ? 'border-black' : 'border-transparent'
                )}
                style={{ backgroundColor: color.value }}
              >
                {value === color.value && (
                  <Check className='h-4 w-4 text-white' />
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
