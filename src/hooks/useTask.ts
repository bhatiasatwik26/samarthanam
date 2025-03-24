import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const updateTaskStatus = async ({ userId, eventId, taskName, status }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/task/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId, taskName, status }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update task status");
  }

  return response.json();
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Task status updated successfully",
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task status",
        variant: "destructive",
      });
    },
  });
};
