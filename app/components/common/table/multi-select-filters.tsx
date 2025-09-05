import { MultiSelectFilter } from './multi-select-filter';

// Pre-configured filter components
export function StatusFilter(
  props?: Partial<React.ComponentProps<typeof MultiSelectFilter>>
) {
  return (
    <MultiSelectFilter
      name="status"
      title="Estado"
      placeholder="Todos los estados"
      options={props?.options || []}
      {...props}
    />
  );
}
