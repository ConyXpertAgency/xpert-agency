import { locale } from "next/root-params";
import { First, Second } from '@/components/about'
import { getAboutFirst, getAboutSecond } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
  const lang = (await locale()) as Lang;
  const [first, second] = await Promise.all([
    getAboutFirst(lang),
    getAboutSecond(lang),
  ]);
  return (
    <main className='AppShell'>
        <First first={first} />
        <Second second={second} heroStats={first.stats} lang={lang} />
    </main>
  )
}

export default page
