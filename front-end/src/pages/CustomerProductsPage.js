import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import apiGetAll from '../services/apiGetAll';

export default function ProductsPage() {
  const { name } = useContext(AppContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await apiGetAll('products');
        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <Navbar className="navBar">
        <a className="navBar-a" href="/customer/checkout">
          Produtos
        </a>
        <a className="navBar-a" href="/customer/orders">
          {' '}
          Meus Pedidos
        </a>
        <a
          data-testid="data-testid='customer_products__element-navbar-user-full-name'"
          className="navBar-a"
          href="/register"
        >
          { name }
        </a>
        <a
          data-testid="customer_products__element-navbar-link-logout"
          className="navBar-a"
          onClick={ () => {
            localStorage.clear();
            navigate('../login', { replace: true });
          } }
          href="/login"
        >
          Sair
        </a>
      </Navbar>
      {console.log(products)}
      {products.map((product) => (
        <div key={ product.id }>
          <p
            data-testid={ `customer_products__element-card-title-${product.id}` }
          >
            { product.name }
          </p>
          <p
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            { product.price.replace('.', ',') }
          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt={ product.name }
          />
        </div>
      ))}
    </div>
  );
}
