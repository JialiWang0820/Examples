import { useState } from "react"

// React构建一个可搜索的产品数据表
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        { category }
      </th>
    </tr>
  )
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      { product.name }
    </span>

    return (
      <tr>
        <td>{ name }</td>
        <td>{ product.price }</td>
      </tr>
    )
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = []
  let lastCategory = null

  products.forEach(product => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1 
    ) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if(product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={product.category}
          key={product.category} />
      )
    }
    rows.push(
      <ProductRow 
        product={product}
        key={product.name} />
    )
    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{ rows }</tbody>
    </table>
  )
}

function SearchBar({ 
  filterText, 
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  
  return (
    <div>
      <SearchBar
       filterText={filterText}
       inStockOnly={inStockOnly}
       onFilterTextChange={setFilterText}
       onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  )
}

const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />
}
