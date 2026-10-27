# My Store

თანამედროვე ონლაინ მაღაზიის ვებ-აპლიკაცია, შექმნილი Next.js App Router-ის გამოყენებით.

## ფუნქციები

- Fake Store API-დან პროდუქტების სიისა და დეტალური გვერდების ჩატვირთვა.
- კალათაში პროდუქტის დამატება, რაოდენობის გაზრდა/შემცირება და წაშლა.
- Redux Toolkit-ით კალათის რაოდენობისა და გადასახდელი თანხის მართვა.
- ანგარიშის რეგისტრაციის ფორმა Yup ვალიდაციით და React Hook Form-ით.
- შესვლის ფორმა Fake Store API-სთან ინტეგრაციით.
- რესპონსიული ნავიგაცია და დიზაინი მობილური და დესკტოპ ეკრანებისთვის.

## ტექნოლოგიები

- [Next.js](https://nextjs.org/) 16 და React 19
- [Redux Toolkit](https://redux-toolkit.js.org/) და React Redux
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) და [Yup](https://github.com/jquense/yup)
- [Fake Store API](https://fakestoreapi.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## პროექტის გაშვება

საჭიროა Node.js 20.9 ან უფრო ახალი ვერსია და npm.

```bash
git clone https://github.com/sljebs/react_js-final.git
cd react_js-final
npm install
npm run dev
```

გახსენით [http://localhost:3000](http://localhost:3000).

## ხელმისაწვდომი ბრძანებები

```bash
npm run dev    # დეველოპერული სერვერის გაშვება
npm run lint   # ESLint შემოწმება
npm run build  # production build-ის შექმნა
npm run start  # production სერვერის გაშვება
```

## გვერდები

| მისამართი | აღწერა |
| --- | --- |
| `/products` | პროდუქტების კატალოგი |
| `/products/details/[id]` | პროდუქტის დეტალები |
| `/cart` | კალათა და შეკვეთის ჯამი |
| `/register` | რეგისტრაციის ფორმა |
| `/login` | შესვლის ფორმა |
| `/profile` | მომხმარებლის პროფილი |

## API შენიშვნა

რეგისტრაციის ფორმა მონაცემებს აგზავნის JSONPlaceholder-ის სატესტო endpoint-ზე. JSONPlaceholder წარმატებულ პასუხს აბრუნებს, თუმცა მომხმარებლის მონაცემებს რეალურად არ ინახავს. შესვლის ფორმა იყენებს Fake Store API-ს სატესტო ავტორიზაციას.
