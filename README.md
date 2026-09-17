# 🌸 Period Tracker & Ovulation Cycle

Flo.health જેવી આધુનિક, સુંદર અને લાઈટ પિંક થીમવાળી **Women's Health & Fertility Tracker** મલ્ટી-પેજ વેબસાઇટ, જે સંપૂર્ણપણે **Next.js 14 + Tailwind CSS** માં ડેવલપ કરવામાં આવી છે.

---

## 🧭 ઉપરના મેનુઓ (Top Navigation Menus) કેવી રીતે મેનેજ કરવા?

વેબસાઇટના હેડરમાં Flo.health જેવા નીચે મુજબના મેનુઓ ગોઠવેલા છે:
- **Product** (ડ્રોપડાઉન)
- **Health Library** (ડાયરેક્ટ લિંક)
- **Calculators** (8 સ્પેસિફિક કેલ્ક્યુલેટર ડ્રોપડાઉન)
- **About** (મેડિકલ અફેર્સ, રિસર્ચ, પ્રાઈવેસી પોર્ટલ, એક્યુરેસી ડ્રોપડાઉન)
- **For Clinicians**

### 💡 જો તમારે કોઈ નવો મેનુ ટેબ કે સબ-મેનુ ઉમેરવો હોય:
૧. પ્રોજેક્ટમાં `src/data/navigation.js` ફાઇલ ખોલો.
૨. તેમાં રહેલા `TOP_NAV_MENUS` એરેમાં માત્ર એક નવો ઓબ્જેક્ટ ઉમેરી દો:
```javascript
// નવો મેનુ ડાયરેક્ટ લિંક માટે:
{
  id: "my-new-tab",
  name: "My New Menu",
  href: "/my-page"
}

// ડ્રોપડાઉન સાથેનો મેનુ:
{
  id: "community",
  name: "Community",
  href: "#",
  dropdown: [
    { name: "Forum", href: "/forum", desc: "Discussion board" },
    { name: "Expert Q&A", href: "/qa", badge: "New" }
  ]
}
```
બસ, ફાઇલ સેવ કરતાં જ હેડર અને મોબાઈલ મેનુમાં નવો ટેબ આપમેળે દેખાવા લાગશે!

---

## 🚀 પ્રોજેક્ટ કેવી રીતે ચલાવવો (How to Run)

### ડેવલપમેન્ટ મોડ (Live Preview):
```bash
npm run dev
```
બ્રાઉઝરમાં `http://localhost:3000` ખોલો.

### પ્રોડક્શન બિલ્ડ (Hosting):
```bash
npm run build
```

---

## 📝 નવો આર્ટિકલ કેવી રીતે ઉમેરવો? (Static Articles)
1. `src/data/articles.js` ખોલો.
2. કોઈપણ આર્ટિકલ બ્લોક કોપી-પેસ્ટ કરીને તમારું ટાઈટલ, કેટેગરી અને કન્ટેન્ટ લખો.
3. ફોટો `public/images/articles/` માં મૂકો.
4. આપમેળે તેનું અલગ યુનિક URL પેજ `/articles/[id]` બની જશે!
