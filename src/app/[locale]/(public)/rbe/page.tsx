import { locale } from "next/root-params";
import First from '@/components/rbe/First'
import Five from '@/components/rbe/Five'
import Footer from '@/components/rbe/Footer'
import Four from '@/components/rbe/Four'
import Second from '@/components/rbe/Second'
import Third from '@/components/rbe/Third'
import { getRbeFirst, getRbeSecond, getRbeThird, getRbeFour, getRbeFive, getRbeFooter } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
  const lang = (await locale()) as Lang;
  const [first, second, third, four, five, footer] = await Promise.all([
    getRbeFirst(lang),
    getRbeSecond(lang),
    getRbeThird(lang),
    getRbeFour(lang),
    getRbeFive(lang),
    getRbeFooter(lang),
  ]);
  return (
    <main className='AppShell RbePage'>
        <First first={first} lang={lang} />
        <Second second={second} />
        <Third third={third} />
        <Four four={four} />
        <Five five={five} />
        <Footer footer={footer} lang={lang} />
    </main>
  )
}

export default page
