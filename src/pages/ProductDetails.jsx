import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Header from '../components/Header';

export default class ProductDetails extends Component {
  state = {
    productData: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      productData: await getProductById(id),
    });
  }

  handleClick = () => {
    const { history } = this.props;
    const { productData: { title, price, thumbnail, id } } = this.state;
    const saveProduct = localStorage.getItem('saveProduct');
    const arrayProduct = saveProduct ? JSON.parse(saveProduct) : [];
    arrayProduct.push({ title, thumbnail, price, id, quantity: 1 });
    localStorage.setItem('saveProduct', JSON.stringify(arrayProduct));
    history.push('/cartshop');
  };

  render() {
    const { productData: { title, price, thumbnail } } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">
          Price:
          { price }
        </p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
