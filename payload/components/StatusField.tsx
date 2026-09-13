"use client";

import type { SelectFieldClientComponent } from "payload";
import { SelectInput, useDocumentInfo, useField } from "@payloadcms/ui";

import {
  NEEDS_CONFIRMATION,
  allowedNext,
  isWorkflowSlug,
  statusLabel,
} from "../transitions";

type Option = { label: string; value: string };

/* The status control on every workflow record.

   It offers only the moves Figure 4 allows from the record's saved status,
   so staff are never shown an option the server will refuse. WFL-03: moving
   to Approved or Declined asks for confirmation first.

   This is convenience, not enforcement — the server rule in
   payload/workflows.ts is what actually holds, for the API as well. */
export const StatusField: SelectFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path });
  const { collectionSlug, initialData } = useDocumentInfo();

  const saved = String(initialData?.status ?? value ?? "");
  const allOptions = (field.options ?? []).map((option) =>
    typeof option === "string"
      ? { label: statusLabel(option), value: option }
      : { label: String(option.label), value: String(option.value) },
  ) as Option[];

  const reachable =
    collectionSlug && isWorkflowSlug(collectionSlug) && saved
      ? [saved, ...allowedNext(collectionSlug, saved)]
      : allOptions.map((option) => option.value);

  const options = allOptions.filter((option) =>
    reachable.includes(option.value),
  );

  const handleChange = (selected: unknown) => {
    const chosen = Array.isArray(selected) ? selected[0] : selected;
    const next = (chosen as Option | null)?.value;

    if (!next) return;

    if (NEEDS_CONFIRMATION.includes(next) && next !== saved) {
      const confirmed = window.confirm(
        `Mark this record as ${statusLabel(next)}?\n\n` +
          (next === "declined"
            ? "Enter the reason for declining before saving — it is kept on the record."
            : "This cannot be undone: an approved record can only move forward."),
      );

      if (!confirmed) return;
    }

    setValue(next);
  };

  return (
    <SelectInput
      path={path}
      name={field.name}
      label={field.label ?? "Status"}
      options={options}
      value={value}
      onChange={handleChange}
      isClearable={false}
      description={
        options.length <= 1
          ? "This record is finished and cannot change status."
          : undefined
      }
    />
  );
};
