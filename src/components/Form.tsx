import React, { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<string, string>) => void;
  intent?: Array<[string, string]>;
};

const DEFAULT_INTENT_OPTIONS: Array<[string, string]> = [
  ["Get technical support", "support"],
  ["Rent GPUs", "rent"],
  ["Other", "other"],
];

const ContactFormModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  intent = DEFAULT_INTENT_OPTIONS,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    intent: "",
  });
  const [loading, setLoading] = useState(false);



const sendEmail = async () => {
  try {
    setLoading(true);
    const data = {...form};
    setForm(
      Object.fromEntries(Object.keys(form).map((key) => [key, ""])) as typeof form
    );

    
    await fetch("/api/emailForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        intent: form.intent,
      }),
    });
    setLoading(false);
  } catch (error) {
    console.error(error);
  }finally{
    setLoading(false)
  }
}

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail()
    onSubmit?.(form);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 absolute z-100 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Card */}
      <div
        ref={dialogRef}
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 lg:p-12 shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-zinc-100"
          aria-label="Close"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 id="modal-title" className="text-xl font-semibold text-zinc-900">
          Get Started with Grid
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Please complete the information below to help guide you to the right
          place.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium text-zinc-800"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-medium text-zinc-800"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
            </div>
          </div>
          <div>
          <legend className="mb-2 text-sm font-medium text-zinc-800">
              Email{" "}
              <span className="text-green-500">*</span>
            </legend>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              required
            />
          </div>

          <fieldset className="mt-2">
            <legend className="mb-2 text-sm font-medium text-zinc-800">
              What would you like to do with Grid?{" "}
              <span className="text-green-500">*</span>
            </legend>
            <div className="space-y-2">
              {intent.map(([label, value]) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="intent"
                    value={value}
                    checked={form.intent === value}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-300"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                loading ? "bg-zinc-500 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
              onClick={submit}
            >
              {loading ? "Sending..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
