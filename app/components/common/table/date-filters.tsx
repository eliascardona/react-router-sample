import { cn } from '~/lib/utils';
import { DateInputFilter } from './date-input-filter';
import { DateRangeFilter } from './date-range-filter';

// Pre-configured date range filters for common use cases
export function CreatedDateFilter() {
  return (
    <DateRangeFilter
      title="Fecha de Creación"
      fromName="createdFrom"
      toName="createdTo"
      fromLabel="Creado desde"
      toLabel="Creado hasta"
      placeholder={{
        from: 'Fecha inicio',
        to: 'Fecha fin',
      }}
    />
  );
}

export function AssignedDateFilter() {
  return (
    <DateRangeFilter
      title="Fecha de Asignación"
      fromName="assignedFrom"
      toName="assignedTo"
      fromLabel="Asignado desde"
      toLabel="Asignado hasta"
      placeholder={{
        from: 'Fecha inicio',
        to: 'Fecha fin',
      }}
    />
  );
}

export function DeadlineDateFilter() {
  return (
    <DateRangeFilter
      title="Fecha Límite"
      fromName="deadlineFrom"
      toName="deadlineTo"
      fromLabel="Límite desde"
      toLabel="Límite hasta"
      placeholder={{
        from: 'Fecha inicio',
        to: 'Fecha fin',
      }}
    />
  );
}

export function UpdatedDateFilter() {
  return (
    <DateRangeFilter
      title="Última Actualización"
      fromName="updatedFrom"
      toName="updatedTo"
      fromLabel="Actualizado desde"
      toLabel="Actualizado hasta"
      placeholder={{
        from: 'Desde fecha',
        to: 'Hasta fecha',
      }}
    />
  );
}

// Single date filters for specific use cases
export function DueDateFilter() {
  return (
    <DateInputFilter
      name="dueDate"
      label="Fecha de Vencimiento"
      placeholder="Seleccionar fecha"
    />
  );
}

export function StartDateFilter() {
  return (
    <DateInputFilter
      name="startDate"
      label="Fecha de Inicio"
      placeholder="Seleccionar fecha de inicio"
    />
  );
}

export function CompletedDateFilter() {
  return (
    <DateInputFilter
      name="completedDate"
      label="Fecha de Finalización"
      placeholder="Seleccionar fecha de finalización"
    />
  );
}

// DateTime filters for more precise filtering
export function ScheduledDateTimeFilter() {
  return (
    <DateInputFilter
      name="scheduledDateTime"
      label="Fecha y Hora Programada"
      type="datetime-local"
      placeholder="Seleccionar fecha y hora"
      size="default"
    />
  );
}

export function ReminderTimeFilter() {
  return (
    <DateInputFilter
      name="reminderTime"
      label="Hora de Recordatorio"
      type="time"
      placeholder="Seleccionar hora"
      showIcon={false}
    />
  );
}

// Generic date range for custom fields
export function CustomDateRangeFilter({
  title,
  fieldPrefix,
  showPlaceholders = true,
}: {
  title: string;
  fieldPrefix: string;
  showPlaceholders?: boolean;
}) {
  return (
    <DateRangeFilter
      title={title}
      fromName={`${fieldPrefix}From`}
      toName={`${fieldPrefix}To`}
      fromLabel={`${title} desde`}
      toLabel={`${title} hasta`}
      placeholder={
        showPlaceholders
          ? {
              from: 'Fecha inicio',
              to: 'Fecha fin',
            }
          : {}
      }
    />
  );
}

// Generic single date filter
export function CustomDateFilter({
  name,
  label,
  type = 'date',
  placeholder,
}: {
  name: string;
  label: string;
  type?: 'date' | 'datetime-local' | 'time';
  placeholder?: string;
}) {
  return (
    <DateInputFilter
      name={name}
      label={label}
      type={type}
      placeholder={
        placeholder ||
        `Seleccionar ${type === 'date' ? 'fecha' : type === 'datetime-local' ? 'fecha y hora' : 'hora'}`
      }
    />
  );
}

// Utility component for multiple date filters in a row
export function DateFilterGroup({
  children,
  className = 'flex flex-wrap gap-2 items-end',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

// Base layout components for organizing filters
export function FilterSection({
  title,
  children,
  className = 'space-y-3',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {title && (
        <h4 className="text-foreground mb-3 border-b pb-2 text-sm font-medium">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

export function FilterRow({
  children,
  className = 'flex flex-wrap gap-2 items-end',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function FilterGrid({
  children,
  columns = 2,
  className,
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {children}
    </div>
  );
}

// Organized date filter groups by category

// 1. CREATION & LIFECYCLE DATES
export function CreationLifecycleFilters() {
  return (
    <FilterSection title="Fechas de Creación y Ciclo de Vida">
      <FilterGrid columns={2}>
        <DateRangeFilter
          title="Fecha de Creación"
          fromName="createdFrom"
          toName="createdTo"
          fromLabel="Creado desde"
          toLabel="Creado hasta"
          placeholder={{ from: 'Fecha inicio', to: 'Fecha fin' }}
        />
        <DateRangeFilter
          title="Última Actualización"
          fromName="updatedFrom"
          toName="updatedTo"
          fromLabel="Actualizado desde"
          toLabel="Actualizado hasta"
          placeholder={{ from: 'Desde fecha', to: 'Hasta fecha' }}
        />
      </FilterGrid>
    </FilterSection>
  );
}

// 2. ASSIGNMENT & WORKFLOW DATES
export function AssignmentWorkflowFilters() {
  return (
    <FilterSection title="Fechas de Asignación y Flujo de Trabajo">
      <FilterGrid columns={2}>
        <DateRangeFilter
          title="Fecha de Asignación"
          fromName="assignedFrom"
          toName="assignedTo"
          fromLabel="Asignado desde"
          toLabel="Asignado hasta"
          placeholder={{ from: 'Fecha inicio', to: 'Fecha fin' }}
        />
        <DateInputFilter
          name="completedDate"
          label="Fecha de Finalización"
          placeholder="Seleccionar fecha de finalización"
        />
      </FilterGrid>
    </FilterSection>
  );
}

// 3. DEADLINE & SCHEDULING DATES
export function DeadlineSchedulingFilters() {
  return (
    <FilterSection title="Fechas Límite y Programación">
      <FilterGrid columns={2}>
        <DateRangeFilter
          title="Fecha Límite"
          fromName="deadlineFrom"
          toName="deadlineTo"
          fromLabel="Límite desde"
          toLabel="Límite hasta"
          placeholder={{ from: 'Fecha inicio', to: 'Fecha fin' }}
        />
        <DateInputFilter
          name="scheduledDateTime"
          label="Fecha y Hora Programada"
          type="datetime-local"
          placeholder="Seleccionar fecha y hora"
          size="default"
        />
      </FilterGrid>
    </FilterSection>
  );
}

// 4. PROJECT & MILESTONE DATES
export function ProjectMilestoneFilters() {
  return (
    <FilterSection title="Fechas de Proyecto e Hitos">
      <FilterGrid columns={2}>
        <DateInputFilter
          name="startDate"
          label="Fecha de Inicio"
          placeholder="Seleccionar fecha de inicio"
        />
        <DateInputFilter
          name="dueDate"
          label="Fecha de Vencimiento"
          placeholder="Seleccionar fecha"
        />
      </FilterGrid>
    </FilterSection>
  );
}

// 5. REVIEW & APPROVAL DATES
export function ReviewApprovalFilters() {
  return (
    <FilterSection title="Fechas de Revisión y Aprobación">
      <FilterGrid columns={2}>
        <DateRangeFilter
          title="Fecha de Revisión"
          fromName="reviewFrom"
          toName="reviewTo"
          fromLabel="Revisado desde"
          toLabel="Revisado hasta"
          placeholder={{ from: 'Fecha inicio', to: 'Fecha fin' }}
        />
        <DateRangeFilter
          title="Fecha de Aprobación"
          fromName="approvalFrom"
          toName="approvalTo"
          fromLabel="Aprobado desde"
          toLabel="Aprobado hasta"
          placeholder={{ from: 'Fecha inicio', to: 'Fecha fin' }}
        />
      </FilterGrid>
    </FilterSection>
  );
}

// 6. COMMUNICATION & REMINDER DATES
export function CommunicationReminderFilters() {
  return (
    <FilterSection title="Fechas de Comunicación y Recordatorios">
      <FilterGrid columns={2}>
        <DateRangeFilter
          title="Fecha de Notificación"
          fromName="notificationFrom"
          toName="notificationTo"
          fromLabel="Notificado desde"
          toLabel="Notificado hasta"
          placeholder={{ from: 'Fecha inicio', to: 'Fecha fin' }}
        />
        <DateInputFilter
          name="reminderTime"
          label="Hora de Recordatorio"
          type="time"
          placeholder="Seleccionar hora"
          showIcon={false}
        />
      </FilterGrid>
    </FilterSection>
  );
}

// COMPREHENSIVE FILTER LAYOUTS

// Layout 1: Basic filters (most common)
export function BasicDateFilters() {
  return (
    <div className="space-y-6">
      <CreationLifecycleFilters />
      <DeadlineSchedulingFilters />
    </div>
  );
}

// Layout 2: Project management focused
export function ProjectDateFilters() {
  return (
    <div className="space-y-6">
      <ProjectMilestoneFilters />
      <AssignmentWorkflowFilters />
      <ReviewApprovalFilters />
    </div>
  );
}

// Layout 3: Complete set (for complex applications)
export function ComprehensiveDateFilters() {
  return (
    <div className="space-y-6">
      <CreationLifecycleFilters />
      <AssignmentWorkflowFilters />
      <DeadlineSchedulingFilters />
      <ProjectMilestoneFilters />
      <ReviewApprovalFilters />
      <CommunicationReminderFilters />
    </div>
  );
}

// Layout 4: Compact horizontal layout
export function CompactDateFilters() {
  return (
    <FilterRow className="flex flex-wrap items-end gap-2">
      <DateRangeFilter
        title="Creación"
        fromName="createdFrom"
        toName="createdTo"
        fromLabel="Creado desde"
        toLabel="Creado hasta"
        triggerClassName="h-8 min-w-[120px]"
      />
      <DateRangeFilter
        title="Actualización"
        fromName="updatedFrom"
        toName="updatedTo"
        fromLabel="Actualizado desde"
        toLabel="Actualizado hasta"
        triggerClassName="h-8 min-w-[120px]"
      />
      <DateRangeFilter
        title="Límite"
        fromName="deadlineFrom"
        toName="deadlineTo"
        fromLabel="Límite desde"
        toLabel="Límite hasta"
        triggerClassName="h-8 min-w-[120px]"
      />
    </FilterRow>
  );
}

// Custom builder for specific use cases
export function CustomDateFilterBuilder({
  pairs,
  title,
  columns = 2,
}: {
  pairs: Array<{
    type: 'range' | 'single';
    title: string;
    fromName?: string;
    toName?: string;
    name?: string;
    label?: string;
    inputType?: 'date' | 'datetime-local' | 'time';
    fromLabel?: string;
    toLabel?: string;
  }>;
  title?: string;
  columns?: 1 | 2 | 3;
}) {
  return (
    <FilterSection title={title}>
      <FilterGrid columns={columns}>
        {pairs.map((pair, index) => {
          if (pair.type === 'range') {
            return (
              <DateRangeFilter
                key={index}
                title={pair.title}
                fromName={pair.fromName}
                toName={pair.toName}
                fromLabel={pair.fromLabel}
                toLabel={pair.toLabel}
              />
            );
          } else {
            return (
              <DateInputFilter
                key={index}
                name={pair.name!}
                label={pair.label || pair.title}
                type={pair.inputType}
              />
            );
          }
        })}
      </FilterGrid>
    </FilterSection>
  );
}
