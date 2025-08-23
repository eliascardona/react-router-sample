import { Check, ChevronsUpDown, ScrollText, SquareX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';

interface ProgramSwitcherOption {
  label: string;
  value: string;
}

export function ProgramSwitcher() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] =
    useState<ProgramSwitcherOption | null>(null);

  const programsOptions = [
    { label: 'lolo', value: 'lolo' },
    { label: 'lolo', value: 'lala' },
  ];

  useEffect(() => {
    const programIdFromUrl = searchParams.get('programId');

    if (programIdFromUrl && programsOptions.length > 0) {
      const programFromUrl = programsOptions.find(
        (p) => p.value === programIdFromUrl
      );
      if (programFromUrl) {
        setSelectedProgram(programFromUrl);
      }
    } else if (!programIdFromUrl) {
      setSelectedProgram(null);
    }
  }, [searchParams, programsOptions]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    // Reset pagination when changing program
    newSearchParams.delete('page');

    const newSearch = newSearchParams.toString();
    navigate(newSearch ? `?${newSearch}` : window.location.pathname, {
      replace: true,
    });
  };

  const handleProgramSelect = (program: ProgramSwitcherOption) => {
    setSelectedProgram(program);
    setOpen(false);
    updateSearchParams({ programId: program.value });
  };

  const handleClearSelection = () => {
    setSelectedProgram(null);
    setOpen(false);
    updateSearchParams({ programId: null });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Seleccionar Programa"
              className="w-full max-w-sm justify-between"
              onClick={() => setOpen(!open)}>
              <div className="flex min-w-0 flex-1 items-center">
                <ScrollText className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">
                  {selectedProgram?.label || 'Seleccionar programa...'}
                </span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {selectedProgram?.label || 'Seleccionar programa...'}
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar Programa..." />
          <CommandList>
            <CommandEmpty>No se encontraron programas.</CommandEmpty>
            <CommandGroup>
              {selectedProgram && (
                <CommandItem
                  onSelect={handleClearSelection}
                  className="text-muted-foreground text-sm">
                  <SquareX className="mr-2 h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">Limpiar selección</span>
                </CommandItem>
              )}

              {programsOptions.map((program) => (
                <CommandItem
                  key={program.value}
                  value={program.label}
                  onSelect={() => handleProgramSelect(program)}
                  className="text-sm">
                  <ScrollText className="mr-2 h-4 w-4 shrink-0" />
                  {program.label}
                  <Check
                    className={cn(
                      'ml-2 h-4 w-4 shrink-0',
                      selectedProgram?.value === program.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
