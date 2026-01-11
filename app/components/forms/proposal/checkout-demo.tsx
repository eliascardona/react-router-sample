import Grid from "./grid";
import type { Form, FieldConfig } from "./schema";
import { FormField } from "../fields/form-field";
import { FieldTypeEnum } from "~/lib/forms/retrieving/types";

export function CheckoutFormDemo() {
    const sampleFields: FieldConfig[] = [
        { name: "firstName", label: "First name", type: FieldTypeEnum.enum.text, row: 1 },
        { name: "lastName", label: "Last name", type: FieldTypeEnum.enum.text, row: 1 },
        { name: "email", label: "Email", type: FieldTypeEnum.enum.text, row: 1 },
        { name: "cardNumber", label: "Card number", type: FieldTypeEnum.enum.text, row: 2 },
        { name: "expiry", label: "Expiry", type: FieldTypeEnum.enum.text, row: 2 },
        { name: "cvc", label: "CVC", type: FieldTypeEnum.enum.text, row: 2 },
    ];

    const sampleLayout: Form["layout"] = {
        rowGap: "gap-y-8",
        rows: [
            {
                id: "row-1",
                order: 1,
                rowLabel: "Personal info",
                columnsQuantity: 2,
                columns: [
                    { fieldIdentifier: "firstName" },
                    { fieldIdentifier: "lastName" },
                    { fieldIdentifier: "email" },
                ],
            },
            {
                id: "row-2",
                order: 2,
                rowLabel: "Payment Method",
                columnsQuantity: 1,
                columns: [
                    { fieldIdentifier: "cardNumber" },
                ],
            },
            {
                id: "row-2",
                order: 2,
                columnsQuantity: 2,
                columns: [
                    { fieldIdentifier: "expiry" },
                    { fieldIdentifier: "cvc" },
                ],
            },
        ],
    };

    const demoForm: Form = {
        name: "checkout",
        id: "11111111-1111-4111-8111-111111111111",
        fields: sampleFields,
        layout: sampleLayout,
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Checkout — Updated Static Grid</h2>

            <Grid layout={demoForm.layout}>
                <Grid.Dynamic
                    form={demoForm}
                    renderField={(f) => <FormField key={f.name} fieldConfig={f} />}
                />
            </Grid>
        </div>
    );
}
