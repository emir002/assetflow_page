import { send } from "@emailjs/core";

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  await send(env.EMAILJS_SERVICE, env.EMAILJS_TEMPLATE, {
    from_name: name,
    reply_to: email,
    message,
  }, env.EMAILJS_PUBLIC_KEY);

  return new Response("OK");
};
