import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Flag,
  Star,
  TrendingUp,
} from 'lucide-react';
import { MultiSelectFilter } from './multi-select-filter';

// Status filter options with icons
export const STATUS_OPTIONS = [
  {
    value: 'PENDING',
    label: 'Pendiente',
    icon: Clock,
  },
  {
    value: 'IN_PROGRESS',
    label: 'En Revisión',
    icon: AlertCircle,
  },
  {
    value: 'COMPLETED',
    label: 'Completado',
    icon: CheckCircle2,
  },
  {
    value: 'OVERDUE',
    label: 'Vencido',
    icon: AlertCircle,
  },
];

// Priority filter options
export const PRIORITY_OPTIONS = [
  {
    value: 'LOW',
    label: 'Baja',
    icon: Flag,
  },
  {
    value: 'MEDIUM',
    label: 'Media',
    icon: Flag,
  },
  {
    value: 'HIGH',
    label: 'Alta',
    icon: Flag,
  },
  {
    value: 'URGENT',
    label: 'Urgente',
    icon: Flag,
  },
];

// Task type filter options
export const TASK_TYPE_OPTIONS = [
  {
    value: 'REVIEW_FORM',
    label: 'Formulario',
    icon: FileText,
  },
  {
    value: 'REVIEW_APPROVAL',
    label: 'Aprobación',
    icon: CheckCircle2,
  },
  {
    value: 'REVIEW_RUBRIC',
    label: 'Rúbrica',
    icon: Star,
  },
  {
    value: 'REVIEW_SCORE',
    label: 'Puntuación',
    icon: TrendingUp,
  },
];

// Pre-configured filter components
export function StatusFilter(
  props?: Partial<React.ComponentProps<typeof MultiSelectFilter>>
) {
  return (
    <MultiSelectFilter
      name="status"
      title="Estado"
      placeholder="Todos los estados"
      options={STATUS_OPTIONS}
      {...props}
    />
  );
}

export function PriorityFilter(
  props?: Partial<React.ComponentProps<typeof MultiSelectFilter>>
) {
  return (
    <MultiSelectFilter
      name="priority"
      title="Prioridad"
      placeholder="Todas las prioridades"
      options={PRIORITY_OPTIONS}
      {...props}
    />
  );
}

export function TaskTypeFilter(
  props?: Partial<React.ComponentProps<typeof MultiSelectFilter>>
) {
  return (
    <MultiSelectFilter
      name="type"
      title="Tipo"
      placeholder="Todos los tipos"
      options={TASK_TYPE_OPTIONS}
      {...props}
    />
  );
}
