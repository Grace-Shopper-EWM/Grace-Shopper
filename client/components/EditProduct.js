import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateProduct } from "../store/singleProduct";
import ClipLoader from "react-spinners/ClipLoader";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name || "",
      description: this.props.product.description || "",
      price: this.props.product.price || "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || "",
        description: this.props.product.description || "",
        price: this.props.product.price || "",
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { name, description, price } = this.state;
    const isAdmin = this.props.isAdmin;
    return isAdmin ? (
      name.length ? (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input name="name" onChange={this.handleChange} value={name} />
            <input
              name="description"
              onChange={this.handleChange}
              value={description}
            />
            <input name="price" onChange={this.handleChange} value={price} />
            <button to="/products" type="submit">
              Update
            </button>
            <Link to="/products">Cancel</Link>
          </form>
        </div>
      ) : (
        <ClipLoader
          color="aqua"
          size={150}
          loading={true}
          speedMultiplier={1.5}
        />
      )
    ) : null;
  }
}

const mapStateToProps = ({ product, auth }) => ({
  product,
  isAdmin: auth.isAdmin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
