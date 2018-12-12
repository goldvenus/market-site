import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, CardFooter } from 'reactstrap';

const ThemeCardTwo = ({ story: { story_img, auth_name, auth_img, views, story_title, story_desc } }) => {
  return (
    <div>
      <Card inverse className="theme-2">
        <div className="wrraper">
          <CardImg width="100%" src={story_img} alt="Card image cap" />
          <div className="overlay">
            <img src={auth_img} alt="auther Img" />
            <CardText className="theme-text-small">
                <span>{auth_name} </span>
                <span className="views"><i className=" fa fa-eye"></i> {views}</span>
            </CardText>
          </div>
        </div>
      </Card>
      <CardFooter className="text-muted">
          <CardText>{story_title} : {story_desc}</CardText>
      </CardFooter>
    </div>
  );
}

export default ThemeCardTwo;
