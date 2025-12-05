// components/TostCredit.ts
import { toast } from "sonner";

export const TostCredit = (message: string) => {
  return toast.info(
    <span>
      {message}{" "}
      <a
        href="/manage-plan"
        className="underline text-blue-400 ml-1"
        rel="noopener noreferrer"
      >
        Comprar agora
      </a>
    </span>
  )
};
