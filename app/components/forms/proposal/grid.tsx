import { type ReactNode } from "react";
import type { FormLayout, GridRow, FieldConfig, Form } from "./schema";
import { cn } from "~/lib/utils";

interface GridProps {
    layout: FormLayout;
    children?: ReactNode;
    className?: string;
}

export default function Grid({ layout, className, children }: GridProps) {
    const rootClass = cn("grid grid-cols-1", layout.rowGap, className);
    return <div className={rootClass}>{children}</div>;
}

interface RowProps {
    row: GridRow;
    fieldMap: Map<string, FieldConfig>;
    renderField: (f: FieldConfig) => ReactNode;
}

Grid.Row = function GridRowComponent({ row, fieldMap, renderField }: RowProps) {
    const rowClass = cn("grid w-full gap-4", `grid-cols-${row.columnsQuantity}`);

    return (
        <>
            {row.rowLabel && (
                <div className="col-span-full mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {row.rowLabel}
                </div>
            )}

            <div className={rowClass}>
                {row.columns.map((col, colIdx) => {
                    const field = fieldMap.get(col.fieldIdentifier);
                    if (!field) {
                        return (
                            <div key={colIdx} className="text-red-600 text-sm">
                                Missing field: {col.fieldIdentifier}
                            </div>
                        );
                    }
                    return <div key={colIdx}>{renderField(field)}</div>;
                })}
            </div>
        </>
    );
}

interface DynamicProps {
    form: Form;
    renderField: (f: FieldConfig) => ReactNode;
}

Grid.Dynamic = function GridDynamic({ form, renderField }: DynamicProps) {
    const fields = form.fields;
    const fieldMap = new Map<string, FieldConfig>(fields.map(f => [f.name, f]));

    const rows = [...form.layout.rows].sort((a, b) => a.order - b.order);

    return (
        <>
            {rows.map((row, idx) => (
                <Grid.Row
                    key={row.id ?? `row-${idx}`}
                    row={row}
                    fieldMap={fieldMap}
                    renderField={renderField}
                />
            ))}
        </>
    );
}
