import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { contactApi, getApiErrorMessage } from "../services/api";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setStatus("");
      await contactApi.create(form);
      setStatus("Message sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus(getApiErrorMessage(err, "Unable to send message."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-pad py-10">
      <Helmet>
        <title>Contact | Mr Cinephile Telugu</title>
      </Helmet>
      <div className="mx-auto max-w-2xl rounded-lg border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold">Contact</h1>
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
          <input
            required
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
          <textarea
            required
            rows={6}
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
          <button
            disabled={submitting}
            className="w-fit rounded bg-brand-red px-4 py-2 font-semibold disabled:opacity-70"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {status && <p className="text-sm text-zinc-300">{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
