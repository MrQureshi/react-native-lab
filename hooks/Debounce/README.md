# useDebounce

A reusable React hook that delays updating a value until it has stopped changing for a specified amount of time.

This hook is commonly used to reduce unnecessary API requests, expensive calculations, or state updates while a user is typing.

---

## Usage

```tsx
const [search, setSearch] = useState('');

const debouncedSearch = useDebounce(search, 500);
```

## Example

```tsx
const [query, setQuery] = useState('');

const debouncedQuery = useDebounce(query, 600);

useEffect(() => {
  if (!debouncedQuery) return;

  fetchUsers(debouncedQuery);
}, [debouncedQuery]);
```

## Use Cases

- Search bars
- API requests
- Auto-complete
- Form validation
- Filtering lists
- Expensive calculations
- Analytics events
