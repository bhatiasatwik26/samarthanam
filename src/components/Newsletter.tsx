import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess(null);
      return;
    }

    // Simulate API call or subscription logic
    console.log("Subscribed with email:", email);
    setSuccess("Thank you for subscribing!");
    setError(null);
    setEmail("");
  };

  return (
    <section className="bg-red-600 dark:bg-red-900 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Never Miss an Event
          </h2>
          <p className="text-red-100 mb-8">
            Subscribe to our newsletter and be the first to know about upcoming
            events, exclusive offers, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-red-400/30 text-white placeholder:text-red-200"
            />

            <Button
              onClick={handleSubscribe}
              className="bg-white text-red-600 hover:bg-red-100 transition-colors"
            >
              Subscribe
            </Button>
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          {success && <p className="text-green-400 mt-4">{success}</p>}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
