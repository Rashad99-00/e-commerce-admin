import {
  Table,
  Input,
  Space,
  Switch,
  Button,
  message,
  Modal,
} from "antd";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import api from "../../services/api";

type CategoryType = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  productsCount: number;
  createdAt: string;
};

function Categories() {

  const [categories,
    setCategories] =
      useState<
        CategoryType[]
      >([]);

  const [search,
    setSearch] =
      useState("");

  const [name,
    setName] =
      useState("");

  const [description,
    setDescription] =
      useState("");

  const [isActive,
    setIsActive] =
      useState(true);

  const [page,
    setPage] =
      useState(1);

  const [total,
    setTotal] =
      useState(0);

  const [loading,
    setLoading] =
      useState(false);

  const [createLoading,
    setCreateLoading] =
      useState(false);

  const [editId,
    setEditId] =
      useState<
        string | null
      >(null);

  const [open,
    setOpen] =
      useState(false);

  //GET ALL CATEGORIES

  useEffect(() => {

    const fetchCategories =
      async () => {

        try {

          setLoading(true);

          const res =
            await api.get(
              `/categories?page=${page}&pageSize=10&name=${search}`
            );

          setCategories(
            res.data.data.data
          );

          setTotal(
            res.data.data.totalCount
          );

        } catch {

          console.log(
            "Categories failed"
          );

        } finally {

          setLoading(false);

        }
      };

    void fetchCategories();

  }, [search, page]);

  //CREATE CATEGORY

  const createCategory =
    async () => {

      if (
        !name.trim()
      ) {

        message.error(
          "Ad boş ola bilməz"
        );

        return;
      }

      try {

        setCreateLoading(true);

        await api.post(
          "/categories",
          {
            name,
            description,
            isActive,
          }
        );

        const res =
          await api.get(
            `/categories?page=${page}&pageSize=10&name=${search}`
          );

        setCategories(
          res.data.data.data
        );

        setTotal(
          res.data.data.totalCount
        );

        setName("");

        setDescription("");

        setIsActive(true);

        message.success(
          "Kateqoriya əlavə edildi"
        );

      } catch {

        message.error(
          "Əlavə etmə uğursuz oldu"
        );

      } finally {

        setCreateLoading(false);

      }
    };

  //UPDATE CATEGORY

  const updateCategory =
    async () => {

      if (
        !name.trim()
      ) {

        message.error(
          "Ad boş ola bilməz"
        );

        return;
      }

      try {

        setCreateLoading(true);

        await api.patch(
          `/categories/${editId}`,
          {
            name,
            description,
            isActive,
          }
        );

        const res =
          await api.get(
            `/categories?page=${page}&pageSize=10&name=${search}`
          );

        setCategories(
          res.data.data.data
        );

        setTotal(
          res.data.data.totalCount
        );

        setName("");

        setDescription("");

        setIsActive(true);

        setEditId(null);

        setOpen(false);

        message.success(
          "Kateqoriya yeniləndi"
        );

      } catch {

        message.error(
          "Yeniləmə uğursuz oldu"
        );

      } finally {

        setCreateLoading(false);

      }
    };

  //fETE CATEGORY

  const deleteCategory =
    async (
      id: string
    ) => {

      try {

        await api.delete(
          `/categories/${id}`
        );

        const res =
          await api.get(
            `/categories?page=${page}&pageSize=10&name=${search}`
          );

        setCategories(
          res.data.data.data
        );

        setTotal(
          res.data.data.totalCount
        );

        message.success(
          "Kateqoriya silindi"
        );

      } catch (error: unknown) {

        if (
          axios.isAxiosError(error)
        ) {

          if (
            error.response?.data?.message ===
            "Category cannot be deleted because it still has products"
          ) {

            message.error(
              "Bu kateqoriyada məhsul var"
            );

            return;
          }

          message.error(
            error.response?.data?.message
          );
        }
      }
    };

  //GET CATEGORY BY ID

  const getCategoryById =
    async (
      id: string
    ) => {

      try {

        const res =
          await api.get(
            `/categories/${id}`
          );

        const category =
          res.data.data;

        setName(
          category.name
        );

        setDescription(
          category.description
        );

        setIsActive(
          category.isActive
        );

        setEditId(
          category.id
        );

        setOpen(true);

      } catch {

        message.error(
          "Kateqoriya tapılmadı"
        );

      }
    };

  const columns = [
    {
      title: "Ad",
      dataIndex: "name",
    },

    {
      title: "Açıqlama",
      dataIndex:
        "description",
    },

    {
      title: "Status",

      render: (
        _: unknown,
        record: CategoryType
      ) => (

        <span>
          {record.isActive
            ? "Aktiv"
            : "Passiv"}
        </span>

      ),
    },

    {
      title: "Məhsul sayı",
      dataIndex:
        "productsCount",
    },

    {
  title: "Yaradılma tarixi",

  render: (
    _: unknown,
    record: CategoryType
  ) => (

    <span>
      {new Date(
        record.createdAt
      ).toLocaleDateString()}
    </span>

  ),
},

    {
      title: "Əməliyyat",

      render: (
        _: unknown,
        record: CategoryType
      ) => (

        <Space>

          <Button
            onClick={() =>
              getCategoryById(
                record.id
              )
            }
          >
            Edit
          </Button>

          <Button
            danger
            onClick={() =>
              deleteCategory(
                record.id
              )
            }
          >
            Sil
          </Button>

        </Space>

      ),
    },
  ];

  return (
    <div>

      <h1>
        Kateqoriyalar
      </h1>

      <Space
        style={{
          marginBottom: 20,
        }}
      >

        <Input
          placeholder=
            "Axtar..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </Space>

      <Space
        style={{
          marginBottom: 20,
        }}
      >

        <Input
          placeholder="Ad"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <Input
          placeholder=
            "Açıqlama"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <Switch
          checked={isActive}
          onChange={setIsActive}
        />

        <Button
          type="primary"
          loading={
            createLoading
          }
          onClick={
            createCategory
          }
        >
          Əlavə et
        </Button>

      </Space>

      <Table
        columns={columns}
        dataSource={
          categories
        }
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: 10,
          total: total,

          onChange: (
            newPage
          ) =>
            setPage(
              newPage
            ),
        }}
      />

      <Modal
        open={open}
        onCancel={() =>
          setOpen(false)
        }
        footer={null}
        title="Kateqoriyanı yenilə"
      >

        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >

          <Input
            placeholder="Ad"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <Input
            placeholder=
              "Açıqlama"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Switch
            checked={isActive}
            onChange={setIsActive}
          />

          <Button
            type="primary"
            loading={
              createLoading
            }
            onClick={
              updateCategory
            }
          >
            Save
          </Button>

        </Space>

      </Modal>

    </div>
  );
}

export default Categories;