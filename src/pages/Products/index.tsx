import ProductFilters from "./components/ProductFilters";
import ProductFormModal from "./components/ProductFormModal";
import ProductHeader from "./components/ProductHeader";
import ProductTable from "./components/ProductTable";
import { useProductEditor } from "./hooks/useProductEditor";
import { useProducts } from "./hooks/useProducts";
import "./Products.css";
import "./Products.responsive.css";

function Products() {
  const list = useProducts();
  const editor = useProductEditor(list.refreshProducts);

  return (
    <div className="admin-products">
      <ProductHeader onCreate={editor.openCreate} />
      <ProductFilters
        categories={list.categories}
        query={list.query}
        onSearch={list.updateFilter.search}
        onCategory={list.updateFilter.category}
        onMinPrice={list.updateFilter.minPrice}
        onMaxPrice={list.updateFilter.maxPrice}
      />
      <ProductTable
        products={list.products}
        loading={list.loading}
        deletingId={list.deletingId}
        page={list.page}
        total={list.total}
        onPageChange={list.setPage}
        onEdit={editor.openEdit}
        onDelete={(id) => void list.deleteProduct(id)}
      />
      <ProductFormModal categories={list.categories} editor={editor} />
    </div>
  );
}

export default Products;
