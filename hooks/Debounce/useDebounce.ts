import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

//usage

// import { useState } from 'react';
// import { TextInput, View, Text } from 'react-native';
// import { useDebounce } from './hooks/useDebounce';

// export default function App() {
//   const [search, setSearch] = useState('');

//   const debouncedSearch = useDebounce(search, 500);

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Search..."
//         value={search}
//         onChangeText={setSearch}
//         style={{
//           borderWidth: 1,
//           borderColor: '#ccc',
//           padding: 12,
//           borderRadius: 8,
//         }}
//       />

//       <Text>Typing: {search}</Text>
//       <Text>Debounced: {debouncedSearch}</Text>
//     </View>
//   );
// }

// api search exaample

// const [query, setQuery] = useState('');

// const debouncedQuery = useDebounce(query, 600);

// useEffect(() => {
//   if (!debouncedQuery.trim()) {
//     return;
//   }

//   fetchUsers(debouncedQuery);
// }, [debouncedQuery]);
