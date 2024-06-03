import { useRouter } from "next/navigation";

export default function useNavigation(url: string) {
  const router = useRouter();
  router.push(url);
}
