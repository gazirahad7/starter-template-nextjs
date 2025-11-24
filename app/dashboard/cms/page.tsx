"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homePageContentSchema, type HomePageContentInput } from "@/lib/validations/cms";
import { getHomePageContent, updateHomePageContent } from "@/lib/actions/cms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function CMSPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const form = useForm<HomePageContentInput>({
    resolver: zodResolver(homePageContentSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      setIsFetching(true);
      const result = await getHomePageContent();
      if (result.success && result.data) {
        form.reset({
          title: result.data.title,
          description: result.data.description || "",
          imageUrl: result.data.imageUrl || "",
        });
      }
      setIsFetching(false);
    };

    fetchContent();
  }, [form]);

  const onSubmit = async (data: HomePageContentInput) => {
    setIsLoading(true);
    try {
      const result = await updateHomePageContent(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Homepage content updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update content",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">CMS - Homepage Content</h1>
        <p className="text-muted-foreground">
          Manage the content displayed on your homepage
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Homepage</CardTitle>
          <CardDescription>
            Update the title, description, and hero image for your homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter page title" {...field} />
                    </FormControl>
                    <FormDescription>
                      The main heading displayed on your homepage
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter page description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description or tagline for your homepage
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL of the hero image to display (leave empty for no image)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
