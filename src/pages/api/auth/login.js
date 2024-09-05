import axios from "axios";

const RECAPTCHA_SECRET_KEY = "6LcC5gsqAAAAAOw-JLW5sh9Ze_Vzp4RDTig6YVin"; // Replace with your secret key

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, captchaToken } = req.body;

    // Step 1: Verify reCAPTCHA token with Google
    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: RECAPTCHA_SECRET_KEY,
            response: captchaToken,
          },
        }
      );

      const { success, score } = response.data;

      if (!success || score < 0.5) {
        return res.status(400).json({ error: "CAPTCHA verification failed" });
      }

      // Step 2: Authenticate user (fake authentication for example)
      if (email === "user@example.com" && password === "password123") {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ error: "CAPTCHA verification failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
