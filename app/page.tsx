"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage } from "@/components/ChatMessage";
import { Send, Loader2, Printer, MessageSquare } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! Welcome to **Pranav Enterprises** 🖨️

I'm your AI assistant here to help with all your printing needs!

**Our Services:**
• Offset & Digital Printing
• Flex & Vinyl Printing
• Sunboard & Glow Sign Boards
• Banners, Stickers & Labels
• ID Cards & Invitation Cards
• Bill Books, Lamination & Binding

How can I help you today? Need a quotation, design help, or have questions about our services?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);

      // If human takeover is triggered, optionally save lead
      if (data.humanTakeover) {
        // You can add lead capture logic here
        console.log("Human takeover requested");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again or contact us directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl p-4">
        {/* Header */}
        <div className="mb-6 text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Printer className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Pranav Enterprises</h1>
          </div>
          <p className="text-gray-600">Your Smart Printing Partner - AI-Powered Support</p>
        </div>

        {/* Chat Card */}
        <Card className="shadow-xl">
          <CardHeader className="border-b bg-white">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat with our AI Assistant
            </CardTitle>
            <CardDescription>
              Get instant quotes, design help, and printing advice in Kannada, English, or Hindi
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <ChatMessage key={index} role={message.role} content={message.content} />
              ))}
              {isLoading && (
                <div className="flex gap-3 p-4 rounded-lg bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600">Typing...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t bg-white p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message... (ನಿಮ್ಮ ಸಂದೇಶ / आपका संदेश)"
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">🎯 Instant Quotes</h3>
              <p className="text-sm text-gray-600">Get pricing in seconds for any printing need</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">🎨 Design Help</h3>
              <p className="text-sm text-gray-600">File guidelines and design assistance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">🌐 Multi-Language</h3>
              <p className="text-sm text-gray-600">Chat in Kannada, English, or Hindi</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need to speak with someone? Just type "talk to owner" in the chat</p>
        </div>
      </div>
    </div>
  );
}
