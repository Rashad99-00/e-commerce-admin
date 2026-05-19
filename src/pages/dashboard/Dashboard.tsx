import {
  // Button,
  Card,
  Col,
  Row,
} from "antd";

import {
  useEffect,
  useState,
} from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

import api from "../../services/api";

type ProductType = {
  id: string;
  name: string;
  price: string;
  stock: number;
  imageUrl: string;
};

type StatsType = {
  totalCategories: number;
  totalProducts: number;
  totalUsers: number;
  totalStock: number;
  latestProducts: ProductType[];
};

function Dashboard() {

  // const navigate =
  //   useNavigate();

  const [stats, setStats] =
    useState<StatsType | null>(
      null
    );

  useEffect(() => {

    const getStats =
      async () => {

        try {

          const res =
            await api.get(
              "/dashboard/stats"
            );

          setStats(
            res.data.data
          );

        } catch {

          console.log(
            "Stats failed"
          );

        }
      };

    getStats();

  }, []);

  // const handleLogout =
  //   async () => {

  //     try {

  //       await api.post(
  //         "/auth/logout"
  //       );

  //     } catch {

  //       console.log(
  //         "Logout failed"
  //       );

  //     } finally {

  //       localStorage.clear();

  //       navigate("/");

  //     }
  //   };

  const cards = [
    {
      title: "Kateqoriyalar",
      value:
        stats?.totalCategories,
    },
    {
      title: "Məhsullar",
      value:
        stats?.totalProducts,
    },
    {
      title: "İstifadəçilər",
      value:
        stats?.totalUsers,
    },
    {
      title: "Anbar",
      value:
        stats?.totalStock,
    },
  ];

  return (
    <div>

      <h1>
        Dashboard
      </h1>

      <Row gutter={16}>

        {cards.map((item) => (

          <Col
            span={6}
            key={item.title}
          >

            <Card
              title={item.title}
              style={{
                borderRadius: 12,
              }}
            >

              <h2
                style={{
                  fontSize: 32,
                  textAlign: "center",
                  margin: 0,
                }}
              >

                {item.value}

              </h2>

            </Card>

          </Col>

        ))}

      </Row>

      <h2
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        Son Məhsullar
      </h2>

      <Row gutter={16}>

        {stats?.latestProducts.map(
          (product) => (

            <Col
              span={6}
              key={product.id}
            >

              <Card
                cover={
                  <img
                    src={
                      product.imageUrl
                    }
                    alt={
                      product.name
                    }
                    style={{
                      height: 220,
                      objectFit:
                        "cover",
                    }}
                  />
                }
              >

                <h3>
                  {product.name}
                </h3>

                <p>
                  Qiymət:
                  {" "}
                  {product.price}
                  ₼
                </p>

                <p>
                  Stok:
                  {" "}
                  {product.stock}
                </p>

              </Card>

            </Col>

          )
        )}

      </Row>

      {/* <Button
        danger
        style={{
          marginTop: 20,
        }}
        onClick={
          handleLogout
        }
      >

        Logout

      </Button> */}

    </div>
  );
}

export default Dashboard;