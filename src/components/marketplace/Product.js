import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack, Form } from "react-bootstrap";
import { useState } from "react";

const Product = ({ product, buy, addAvailable, reduceAvailable, isOwner}) => {
  const { id, price, available, name, description, sold, location, image, owner } =
    product;

    const [addammount, setnewAddAmmount] = useState('');
    const [reduceammount, setnewReduceAmmount] = useState('');
  

  const triggerBuy = () => {
    buy(id, price);
  };

  const triggerAddAvailable = () => {
    addAvailable(id, addammount);
  };
  const triggerReduceAvailable = () => {
    reduceAvailable(id, reduceammount);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>
            <Badge bg="secondary" className="ms-auto">
              {sold} Sold
            </Badge>
            <Badge bg="secondary" className="ms-auto">
              {available} Available
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>


    {isOwner === true && (
    <>
    <Form.Control
     className={"pt-2 mb-1"}
      type="text"
       placeholder="Enter ammount to add"
       onChange={(e) => {
         setnewAddAmmount(e.target.value);
        }}
    />

<Button
  variant="primary"
  className={"mb-4"}
  onClick={() =>triggerAddAvailable()}
>
  Add more inventory
</Button>
</>
         )
        }


{isOwner === true  && (
    <> 
    <Form.Control
     className={"pt-2 mb-1"}
      type="text"
       placeholder="Enter ammount to reduce from inventory"
       onChange={(e) => {
         setnewReduceAmmount(e.target.value);
        }}
    />

<Button
  variant="primary"
  className={"mb-4"}
  onClick={() =>triggerReduceAvailable()}
>
  Remove Inventory
</Button>
</>
)}

         {isOwner!== true && available > 0 ?(
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {utils.format.formatNearAmount(price)} NEAR
          </Button>
          ):(
            <Card.Title>{isOwner ? "" : "SOLD OUT!!"}</Card.Title>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;