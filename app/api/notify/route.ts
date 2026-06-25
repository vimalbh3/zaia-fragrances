import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = process.env.NOTIFY_EMAIL ?? "vish_bhatt90@hotmail.com";
const FROM = "ZAIA Notifications <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { type } = body;

  try {
    if (type === "newsletter") {
      const { email } = body;
      await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `New newsletter signup — ${email}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
            <h2 style="font-size:18px;font-weight:500;margin-bottom:8px">Newsletter Signup</h2>
            <p style="color:#555;margin:0 0 16px">A new visitor subscribed to the ZAIA newsletter.</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888;width:120px">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Time</td><td style="padding:8px 0">${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</td></tr>
            </table>
          </div>
        `,
      });
    } else if (type === "register") {
      const { firstName, lastName, email } = body;
      await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `New account — ${firstName} ${lastName} (${email})`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
            <h2 style="font-size:18px;font-weight:500;margin-bottom:8px">New Account Created</h2>
            <p style="color:#555;margin:0 0 16px">Someone just signed up on ZAIA.</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888;width:120px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Time</td><td style="padding:8px 0">${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</td></tr>
            </table>
          </div>
        `,
      });
    } else if (type === "order") {
      const { orderId, customer, address, items, total, shipping } = body;
      const itemRows = (items as { name: string; size: string; qty: number; price: number }[])
        .map(i => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${i.name} (${i.size})</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">×${i.qty} — £${(i.price * i.qty).toFixed(2)}</td></tr>`)
        .join("");

      await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `New order ${orderId} — ${customer.name} (£${total.toFixed(2)})`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
            <h2 style="font-size:18px;font-weight:500;margin-bottom:8px">New Order Placed</h2>
            <p style="color:#555;margin:0 0 20px">Order <strong>${orderId}</strong> was placed on ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}.</p>

            <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin:0 0 8px">Customer</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888;width:120px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${customer.name}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee">${customer.email}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#888">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${customer.phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Address</td><td style="padding:8px 0">${address}</td></tr>
            </table>

            <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin:0 0 8px">Items</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              ${itemRows}
            </table>

            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#888">Subtotal</td><td style="padding:6px 0;text-align:right">£${(total - shipping).toFixed(2)}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Shipping</td><td style="padding:6px 0;text-align:right">${shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</td></tr>
              <tr style="font-weight:600"><td style="padding:10px 0;border-top:2px solid #1a1a1a">Total</td><td style="padding:10px 0;border-top:2px solid #1a1a1a;text-align:right">£${total.toFixed(2)}</td></tr>
            </table>
          </div>
        `,
      });
    } else {
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify]", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
