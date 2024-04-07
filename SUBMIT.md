## General Instructions

- To run the app locally you must create a `.env` with the following values:

```
VITE_CAT_API_ENDPOINT_URL="https://api.thecatapi.com"
VITE_CAT_API_KEY=<Generated_API_KEY>
```

## Deployed website

https://d2805hbhnwzk4y.cloudfront.net/

## Improvements still to make

### Fetching Improvements

On the home page I have used TanStack Query with queries a mapper to join the two results, favourite and cats,
and a `useEffect`.

This was a compromise to leverage individual TanStack Query caches. The downside is having a `useEffect` and a mapper.

I've investigated using Promise.all() with Favourites and Search endpoints, but different API return schemas hindered leveraging TanStack Query for cache updates. Suggest implementing an aggregating layer (GraphQL or Node server) on the backend to return data adapted for the Home page:

Create a "Home" endpoint with breed/limit filters, including Favourites data.

And if having an aggregating layer is not possible, I would investigate futher how to create a coplex cache in TanStack Query.

### Multilingual

I’d go for a solution using a library, because i18n can be quite complex (browser preferences, SEO, fallbacks, cache, SPA or SSR?, etc). I’d probably choose [react-i18next](https://react.i18next.com/) as this is one of the most popular ones and compatible with frameworks.

### Accessibility

Really good accessibility is very complex. I’d also use a library for this, like [headless UI](https://headlessui.com/), [radix-ui](https://www.radix-ui.com/) or [react aria](https://react-spectrum.adobe.com/react-aria/).
For custom components, I would use `aria-*` tags as much as possible and use for example ESlint rules like : [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), and tools like [axe-core](https://www.deque.com/axe/).

### Write automated tests

In the interest of time I have just added a few tests with Vitest and Cypress to demonstrate how I would approach it. In a professional scenario I would be much more thorough, including intercepting and mocking all requests, where as now I have just done that with a couple for demonstration.

### UX improvements

- I have used the color scheme from Simbase and have extended the Tailwind theme in order to make the website consistent with Simbase.
- I have saved the search values on the homepage in Zustand in order to improve the user experience and reduce the amount of fetches when navigating between pages.
- I have added a loading state to improve the user experience and reduce cumulative layout shift, with more time I would improve the styling of the skeleton.
- I have added hover states to the buttons.
- I've implemented optimistc updates to the favourite requests, meaning that the UI updates before the favourite request is finished.

### User is hardcoded

For a real app, we would need to make the `user_id` of the favourites request dynamic and linked to the user account. For now I have hardcoded it.

### React Router on Cloudfront

I have deployed to Cloudfront, as we are using client side routing (React Router) the CDN doesn't know how to redirect the `/favorites` endpoint, everything works well if you navigate through the app itself, but if you refresh or try to open the page directly it will return a 404.

I have made a temporary fix for this for now by setting the Error document to also be `index.html`.

Ideally I should implement a definitive fix. For example using [CloudFront functions](https://dev.to/santisbon/serving-a-react-router-app-through-cloudfront-1h28)
