import CategoryFormModal from "./components/CategoryFormModal";
import CategoryHeader from "./components/CategoryHeader";
import CategoryTable from "./components/CategoryTable";
import { useCategories } from "./hooks/useCategories";
import "./Categories.css";
import "./Categories.responsive.css";

function Categories() {
  const state = useCategories();

  return (
    <div className="admin-categories">
      <CategoryHeader
        categories={state.categories}
        total={state.total}
        search={state.search}
        onSearch={state.changeSearch}
        onCreate={state.openCreate}
      />
      <CategoryTable
        categories={state.categories}
        page={state.page}
        total={state.total}
        loading={state.loading}
        deletingId={state.deletingId}
        onPageChange={state.setPage}
        onEdit={state.openEdit}
        onDelete={(category) => void state.remove(category)}
      />
      <CategoryFormModal state={state} />
    </div>
  );
}

export default Categories;
