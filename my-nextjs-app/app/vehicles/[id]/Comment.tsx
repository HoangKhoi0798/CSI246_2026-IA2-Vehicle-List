"use client";

import { useState } from "react";
import { addComment } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import Input from "@/app/ui/components/Input";
import Textarea from "@/app/ui/components/Text";
import Button from "@/app/ui/components/Button";

export default function CommentForm({ vehicleId }: { vehicleId: string }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment(vehicleId, { author, text });
      setAuthor("");
      setText("");
      router.refresh();
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-lg border space-y-4"
    >
      <h3 className="text-lg font-semibold">Leave a Comment</h3>

      <Input
        label="Your Name"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        placeholder="Jane Doe"
      />

      <Textarea
        label="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows={3}
        placeholder="Your opinion"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}
