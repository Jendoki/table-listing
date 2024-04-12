# table-listing

> Library to render a table, from a list of objects.

[![NPM](https://img.shields.io/npm/v/table-listing.svg)](https://www.npmjs.com/package/table-listing) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save table-listing
```

## Usage

### Available props

- `listTitle` (String): The title of your table.

- `listElements` (Array of Objects): A list of objects where each object represents a row in the table. The properties of each object should always be the same, in the same order, and their values represent the data for each cell in the table.

#### Example:

```jsx
import TableListing from 'table-listing'

const listTitle = "Class 3 students"
const listElements = [
  {
    "name": "John",
    "age": 12
  }, 
  {
    "name": "Elisa",
    "age": 13
  }
]

function Example() {
  return (
    <>
      <TableListing listTitle={listTitle} listElements={listElements}/>
    </>
  );
}
```

## License

MIT © [Jendoki](https://github.com/Jendoki)
