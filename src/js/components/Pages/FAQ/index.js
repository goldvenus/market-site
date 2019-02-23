import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import 'react-accessible-accordion/dist/fancy-example.css';

const FAQ = () => (
  <div className="FAQ">
    <div className="FAQ-head">
      <Container>
        <Row>
          <Col>
            <Breadcrumb className="theme-text-small">
              <BreadcrumbItem>Home </BreadcrumbItem>
              <BreadcrumbItem active>FAQs</BreadcrumbItem>
            </Breadcrumb>
            <h1>FAQs</h1>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="FAQ-body">
      <Container>
        <Row>
          <Col>
            <Accordion>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3>HOW TO PAY?</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, sequi at. Ipsum deserunt quos
                    ipsa neque? Magni earum repellat molestiae sapiente voluptatem, laboriosam eligendi vero maiores non
                    iure quam minima?</p>
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3>WHAT BRANDS OF THE EQUIPMENT ARE AVAIABLE?</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, sequi at. Ipsum deserunt quos
                    ipsa neque? Magni earum repellat molestiae sapiente voluptatem, laboriosam eligendi vero maiores non
                    iure quam minima?</p>
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3>HOW TO EXTEND RENTED GEAR ?</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, sequi at. Ipsum deserunt quos
                    ipsa neque? Magni earum repellat molestiae sapiente voluptatem, laboriosam eligendi vero maiores non
                    iure quam minima?</p>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  </div>

);

export default FAQ;
