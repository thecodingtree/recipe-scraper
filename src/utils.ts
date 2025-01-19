import { toast } from "sonner";

export function showToastMsg(title: string, description?: string) {
  toast(title, {
    description,
  });
}
