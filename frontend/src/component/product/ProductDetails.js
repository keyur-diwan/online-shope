import React, { Fragment,useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {clearErrors, getProductDetails } from '../../actions/productAction';
import { Rating } from "@material-ui/lab";
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData';

const ProductDetails = ({match}) => {


   

    const { id } = useParams();

    const dispatch = useDispatch();

    const alert = useAlert();

    const {product, loading, error } = useSelector( state => state.productDetails );


       const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

    
    useEffect( () => {

        if ( error ) {
            alert.error( error );
            dispatch( clearErrors() );
        }

        dispatch( getProductDetails( id ) )

    }, [dispatch, id, error, alert] );

    return (
        <Fragment>
            {loading ? <Loader /> : (
          <Fragment>
            
            <MetaData title={`${ product.name } Details Page `}/>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images && 
                            product.images.map( ( item, i) => (
                                <img 
                                    className="CarouselImage"
                                    key={item.url}
                                    src={item.url}  
                                    alt= {`${i} Slide`}
                                />
                            
                            ))
                        }
                    </Carousel>
                </div>

                  <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input readOnly type="number" value= "1" />
                    <button >+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    // onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
            </div>
            </div>
            
            <h3 className="reviewsHeading">REVIEWS</h3>

            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews &&
                        product.reviews.map((review) => <ReviewCard review={review} />)
                    }
                </div>
            ) : (
                    <p className="noReviews"> No Reviews Yrt..!</p>
            ) }

      
            </Fragment>
            )}
      </Fragment>
    );
};

export default ProductDetails;
