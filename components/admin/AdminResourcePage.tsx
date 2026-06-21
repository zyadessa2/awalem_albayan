"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type FieldType = "text" | "textarea" | "textarea-list" | "number" | "checkbox" | "select" | "multiselect";

export type AdminOption = {
  label: string;
  value: string;
};

export type AdminField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: AdminOption[];
  required?: boolean;
  upload?: boolean;
};

type ResourceItem = Record<string, unknown> & {
  _id: string;
  title?: string;
  name?: string;
  isPublished?: boolean;
  order?: number;
};

type AdminResourcePageProps = {
  title: string;
  description: string;
  endpoint: string;
  fields: AdminField[];
  emptyText: string;
};

function getId(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "_id" in value) {
    return String(value._id);
  }
  return "";
}

function normalizeInitialValue(field: AdminField, item?: ResourceItem) {
  const value = item?.[field.name];

  if (field.type === "checkbox") return Boolean(value);
  if (field.type === "multiselect") return Array.isArray(value) ? value.map(getId).filter(Boolean) : [];
  if (field.type === "textarea-list") return Array.isArray(value) ? value.join("\n") : "";
  if (field.type === "select") return getId(value);
  if (field.type === "number") return typeof value === "number" ? String(value) : "";

  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function createInitialForm(fields: AdminField[], item?: ResourceItem) {
  return Object.fromEntries(fields.map((field) => [field.name, normalizeInitialValue(field, item)])) as Record<
    string,
    string | boolean | string[]
  >;
}

function toPayload(fields: AdminField[], form: Record<string, string | boolean | string[]>) {
  return Object.fromEntries(
    fields.map((field) => {
      const value = form[field.name];

      if (field.type === "number") return [field.name, value === "" ? undefined : Number(value)];
      if (field.type === "multiselect") return [field.name, Array.isArray(value) ? value : []];
      if (field.type === "checkbox") return [field.name, Boolean(value)];
      if (field.type === "textarea-list") {
        return [
          field.name,
          String(value)
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        ];
      }

      return [field.name, value];
    })
  );
}

function getPreviewUrls(field: AdminField, value: string | boolean | string[]) {
  if (!field.upload) return [];
  if (field.type === "textarea-list") {
    return String(value)
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return typeof value === "string" && value ? [value] : [];
}

function getItemPreview(item: ResourceItem, fields: AdminField[]) {
  const imageField = fields.find((field) => field.upload && field.type !== "textarea-list");
  const value = imageField ? item[imageField.name] : undefined;
  return typeof value === "string" && value ? value : "";
}

function FieldControl({
  field,
  value,
  onChange,
  onUpload,
  isUploading,
}: {
  field: AdminField;
  value: string | boolean | string[];
  onChange: (value: string | boolean | string[]) => void;
  onUpload?: (files: File[]) => void;
  isUploading?: boolean;
}) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9dee8] bg-white px-3 py-2 text-sm text-[#17202a] outline-none transition focus:border-[#6fb23e] focus:ring-2 focus:ring-[#6fb23e]/15";
  const previews = getPreviewUrls(field, value);

  return (
    <label className="block text-sm font-bold text-[#17202a]">
      {field.label}

      {field.type === "textarea" || field.type === "textarea-list" ? (
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          placeholder={field.placeholder}
          value={String(value)}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {field.type === "text" || field.type === "number" ? (
        <input
          className={inputClass}
          type={field.type}
          placeholder={field.placeholder}
          value={String(value)}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {field.type === "select" ? (
        <select className={inputClass} value={String(value)} required={field.required} onChange={(event) => onChange(event.target.value)}>
          <option value="">بدون اختيار</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "multiselect" ? (
        <select
          className={`${inputClass} min-h-28`}
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={(event) => onChange(Array.from(event.currentTarget.selectedOptions).map((option) => option.value))}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "checkbox" ? (
        <span className="mt-2 flex h-10 items-center gap-3 rounded-lg border border-[#d9dee8] bg-white px-3">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-[#6fb23e]" />
          <span className="text-sm font-normal text-[#525252]">مفعل</span>
        </span>
      ) : null}

      {field.upload ? (
        <span className="mt-2 block">
          <input
            type="file"
            accept="image/*"
            multiple={field.type === "textarea-list"}
            disabled={isUploading}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              if (files.length > 0) onUpload?.(field.type === "textarea-list" ? files : files.slice(0, 1));
              event.target.value = "";
            }}
            className="block w-full text-xs text-[#697586] file:ml-3 file:rounded-lg file:border-0 file:bg-[#eef8e8] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#17202a]"
          />
          {field.type === "textarea-list" && !isUploading ? <span className="mt-1 block text-xs font-normal text-[#697586]">يمكنك اختيار أكثر من صورة ورفعها دفعة واحدة.</span> : null}
          {isUploading ? <span className="mt-1 block text-xs font-bold text-[#697586]">جاري رفع الصور...</span> : null}
        </span>
      ) : null}

      {previews.length > 0 ? (
        <span className="mt-3 grid grid-cols-3 gap-2">
          {previews.map((url, index) => (
            <span key={`${url}-${index}`} className="relative h-24 overflow-hidden rounded-lg border border-[#d9dee8] bg-[#f5f7fa]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <span className="absolute bottom-1 right-1 grid size-5 place-items-center rounded-full bg-black/65 text-[10px] font-bold text-white">{index + 1}</span>
              <button
                type="button"
                aria-label={`حذف الصورة ${index + 1}`}
                onClick={() => {
                  if (field.type === "textarea-list") {
                    onChange(previews.filter((_, previewIndex) => previewIndex !== index).join("\n"));
                  } else {
                    onChange("");
                  }
                }}
                className="absolute left-1 top-1 grid size-6 place-items-center rounded-full bg-[#b42318] text-sm font-bold text-white shadow-sm transition hover:bg-[#8f1c13]"
              >
                ×
              </button>
            </span>
          ))}
        </span>
      ) : null}
    </label>
  );
}

function getDisplayTitle(item: ResourceItem) {
  return String(item.title || item.name || item._id);
}

export default function AdminResourcePage({ title, description, endpoint, fields, emptyText }: AdminResourcePageProps) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [editingItem, setEditingItem] = useState<ResourceItem | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean | string[]>>(() => createInitialForm(fields));
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const formTitle = editingItem ? "تعديل العنصر" : "إضافة عنصر جديد";

  const sortedItems = useMemo(() => [...items].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)), [items]);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sortedItems.filter((item) => {
      const titleText = getDisplayTitle(item).toLowerCase();
      const descriptionText = String(item.description || "").toLowerCase();
      const matchesSearch = !query || titleText.includes(query) || descriptionText.includes(query);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && item.isPublished) ||
        (statusFilter === "draft" && !item.isPublished);

      return matchesSearch && matchesStatus;
    });
  }, [search, sortedItems, statusFilter]);

  const loadItems = useCallback(
    async (showLoading = true) => {
      if (showLoading) setIsLoading(true);
      setMessage("");

      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        const json = await response.json();
        setItems(json.data ?? []);
      } catch {
        setMessage("تعذر تحميل البيانات.");
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    queueMicrotask(() => {
      void loadItems(false);
    });
  }, [loadItems]);

  function resetForm() {
    setEditingItem(null);
    setForm(createInitialForm(fields));
  }

  function startEdit(item: ResourceItem) {
    setEditingItem(item);
    setForm(createInitialForm(fields, item));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function patchItem(item: ResourceItem, payload: Record<string, unknown>) {
    const response = await fetch(`${endpoint}/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await response.json();

    if (!response.ok) throw new Error(json.error?.message || "تعذر تحديث العنصر.");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch(editingItem ? `${endpoint}/${editingItem._id}` : endpoint, {
        method: editingItem ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(fields, form)),
      });
      const json = await response.json();

      if (!response.ok) throw new Error(json.error?.message || "تعذر حفظ البيانات.");

      setMessage("تم الحفظ بنجاح.");
      resetForm();
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر حفظ البيانات.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(item: ResourceItem) {
    const label = getDisplayTitle(item);
    if (!window.confirm(`حذف: ${label}?`)) return;

    setMessage("");

    try {
      const response = await fetch(`${endpoint}/${item._id}`, { method: "DELETE" });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message || "تعذر حذف العنصر.");

      setMessage("تم الحذف بنجاح.");
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر حذف العنصر.");
    }
  }

  async function handleMove(item: ResourceItem, direction: -1 | 1) {
    const currentIndex = sortedItems.findIndex((entry) => entry._id === item._id);
    const targetItem = sortedItems[currentIndex + direction];
    if (!targetItem) return;

    const currentOrder = Number(item.order ?? currentIndex);
    const targetOrder = Number(targetItem.order ?? currentIndex + direction);

    try {
      await Promise.all([patchItem(item, { order: targetOrder }), patchItem(targetItem, { order: currentOrder })]);
      await loadItems(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر تغيير الترتيب.");
    }
  }

  async function handleUpload(field: AdminField, files: File[]) {
    setUploadingField(field.name);
    setMessage("");

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/uploads", { method: "POST", body: formData });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error?.message || `تعذر رفع الصورة: ${file.name}`);

        const url = String(json.data?.url || "");

        setForm((current) => {
          const previousValue = current[field.name];
          if (field.type === "textarea-list") {
            const previousText = typeof previousValue === "string" ? previousValue : "";
            return { ...current, [field.name]: previousText ? `${previousText}\n${url}` : url };
          }

          return { ...current, [field.name]: url };
        });
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر رفع الصورة.");
    } finally {
      setUploadingField("");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-2 border-b border-[#dfe4ea] pb-5">
        <h1 className="text-2xl font-extrabold text-[#17202a]">{title}</h1>
        <p className="text-sm leading-6 text-[#697586]">{description}</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <form onSubmit={handleSubmit} className="rounded-lg border border-[#dfe4ea] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-[#17202a]">{formTitle}</h2>
            {editingItem ? (
              <button type="button" onClick={resetForm} className="rounded-lg border border-[#d9dee8] px-3 py-2 text-sm font-bold text-[#525252] transition hover:bg-[#f5f7fa]">
                إلغاء
              </button>
            ) : null}
          </div>

          <div className="grid gap-4">
            {fields.map((field) => (
              <FieldControl
                key={field.name}
                field={field}
                value={form[field.name]}
                onChange={(value) => setForm((current) => ({ ...current, [field.name]: value }))}
                onUpload={(files) => void handleUpload(field, files)}
                isUploading={uploadingField === field.name}
              />
            ))}
          </div>

          <button type="submit" disabled={isSaving} className="mt-5 h-11 w-full rounded-lg bg-[#6fb23e] text-sm font-extrabold text-white transition hover:bg-[#5ca834] disabled:cursor-not-allowed disabled:opacity-60">
            {isSaving ? "جاري الحفظ..." : "حفظ"}
          </button>

          {message ? <p className="mt-4 rounded-lg bg-[#f5f7fa] px-3 py-2 text-sm font-bold text-[#525252]">{message}</p> : null}
        </form>

        <div className="rounded-lg border border-[#dfe4ea] bg-white shadow-sm">
          <div className="grid gap-3 border-b border-[#edf0f3] px-4 py-3 xl:grid-cols-[minmax(0,1fr)_170px_auto] xl:items-center">
            <h2 className="text-lg font-extrabold text-[#17202a]">العناصر الحالية</h2>
            <select className="rounded-lg border border-[#d9dee8] px-3 py-2 text-sm text-[#525252]" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">كل الحالات</option>
              <option value="published">منشور</option>
              <option value="draft">مسودة</option>
            </select>
            <div className="flex gap-2">
              <input className="min-w-0 flex-1 rounded-lg border border-[#d9dee8] px-3 py-2 text-sm outline-none focus:border-[#6fb23e]" placeholder="بحث..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <button type="button" onClick={() => void loadItems()} className="rounded-lg border border-[#d9dee8] px-3 py-2 text-sm font-bold text-[#525252] transition hover:bg-[#f5f7fa]">
                تحديث
              </button>
            </div>
          </div>

          {isLoading ? (
            <p className="p-4 text-sm text-[#697586]">جاري التحميل...</p>
          ) : visibleItems.length === 0 ? (
            <p className="p-4 text-sm text-[#697586]">{emptyText}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-right">
                <thead className="bg-[#f8fafc] text-xs font-extrabold text-[#697586]">
                  <tr>
                    <th className="px-4 py-3">العنصر</th>
                    <th className="px-4 py-3">الحالة</th>
                    <th className="px-4 py-3">الترتيب</th>
                    <th className="px-4 py-3">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0f3]">
                  {visibleItems.map((item) => {
                    const preview = getItemPreview(item, fields);

                    return (
                      <tr key={item._id} className="align-middle">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#d9dee8] bg-[#f5f7fa]">
                              {preview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={preview} alt="" className="h-full w-full object-cover" />
                              ) : null}
                            </div>
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-extrabold text-[#17202a]">{getDisplayTitle(item)}</h3>
                              <p className="mt-1 truncate text-xs text-[#697586]">{String(item.slug || item._id)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${item.isPublished ? "bg-[#eef8e8] text-[#44751f]" : "bg-[#f5f7fa] text-[#697586]"}`}>
                            {item.isPublished ? "منشور" : "مسودة"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => void handleMove(item, -1)} className="h-8 rounded-lg border border-[#d9dee8] px-2 text-xs font-bold text-[#525252] hover:bg-[#f5f7fa]">
                              أعلى
                            </button>
                            <span className="min-w-8 text-center text-sm font-bold text-[#17202a]">{String(item.order ?? 0)}</span>
                            <button type="button" onClick={() => void handleMove(item, 1)} className="h-8 rounded-lg border border-[#d9dee8] px-2 text-xs font-bold text-[#525252] hover:bg-[#f5f7fa]">
                              أسفل
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button type="button" onClick={() => startEdit(item)} className="h-9 rounded-lg bg-[#f4a62a] px-3 text-sm font-extrabold text-white transition hover:bg-[#dc9220]">
                              تعديل
                            </button>
                            <button type="button" onClick={() => void handleDelete(item)} className="h-9 rounded-lg bg-[#c2187a] px-3 text-sm font-extrabold text-white transition hover:bg-[#a91568]">
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
