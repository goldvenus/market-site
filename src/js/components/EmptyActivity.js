import React, { Component } from 'react'
import {Link} from "react-router-dom";

class EmptyActivity extends Component {
    constructor(props) {
        super(props);
    }
    chooseImage (){
        const {e_img_name } = this.props;
        if (e_img_name=="cart")
            return(<svg width="65" height="51" viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M56.8 6.5H5.06188C3.04346 6.5 1.60095 8.4531 2.19454 10.3823L7.54839 27.7823C7.9357 29.041 9.09871 29.9 10.4157 29.9H47.8M56.8 6.5L47.8 29.9M56.8 6.5H60.6767C61.5967 6.5 62.4241 5.93986 62.7657 5.08563V5.08563C63.3569 3.60768 62.2685 2 60.6767 2H58.7861C58.0843 2 57.4047 2.24605 56.8656 2.69534L52.3 6.5M47.8 29.9L45.83 35.1534C45.3909 36.3243 44.2715 37.1 43.021 37.1H11.8" stroke="#252525" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16.3008" cy="46.1" r="3" stroke="#252525" strokeWidth="3"/>
                <circle cx="37.8984" cy="46.1" r="3" stroke="#252525" strokeWidth="3"/>
            </svg>);
        else if(e_img_name=="favouri")
            return(<svg width="76" height="62" viewBox="0 0 76 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70.3013 12.4075H63.4007L61.8153 5.21692C61.1383 2.14529 58.4765 0 55.3424 0H31.3858C28.2516 0 25.5898 2.14514 24.9126 5.21677L23.3273 12.4075H21.6898V9.33939C21.6898 7.61047 20.2884 6.20373 18.5657 6.20373H8.46458C6.74196 6.20373 5.34048 7.61047 5.34048 9.33939V12.4075H5.11996C2.29682 12.4075 0 14.7129 0 17.5468V52.3539C0 55.1878 2.29682 57.4932 5.12011 57.4932H10.3564H28.8655C33.0452 60.2108 38.0239 61.791 43.3639 61.791C48.7039 61.791 53.6828 60.2108 57.8623 57.4932H70.3013C73.1246 57.4932 75.4214 55.1878 75.4214 52.3539V17.5468C75.4214 14.7129 73.1246 12.4075 70.3013 12.4075ZM27.7889 5.85567C28.1653 4.14908 29.6443 2.95704 31.3856 2.95704H55.3422C57.0835 2.95704 58.5625 4.14893 58.9387 5.85567L60.3832 12.4075H57.8623C53.6826 9.68981 48.7039 8.10964 43.3639 8.10964C38.0239 8.10964 33.0452 9.68981 28.8655 12.4075H26.3445L27.7889 5.85567ZM8.28663 9.33939C8.28663 9.24091 8.36647 9.16092 8.46458 9.16092H18.5656C18.6637 9.16092 18.7435 9.24106 18.7435 9.33939V12.4075H8.28663V9.33939ZM11.8295 54.5359V38.4758C11.8295 37.6592 11.17 36.9972 10.3564 36.9972C9.54287 36.9972 8.88337 37.6592 8.88337 38.4758V54.536H5.12011C3.92147 54.536 2.94615 53.557 2.94615 52.3539V17.5468C2.94615 16.3435 3.92147 15.3647 5.12011 15.3647H6.8137H20.2166H24.5099H25.1003C19.8869 20.2656 16.6233 27.2321 16.6233 34.9503C16.6233 42.6684 19.8869 49.6349 25.1003 54.5359H11.8295ZM56.9648 54.536C55.2089 55.7683 53.2805 56.7685 51.2236 57.4932C48.7618 58.3605 46.1171 58.8338 43.3639 58.8338C40.6107 58.8338 37.9658 58.3604 35.5042 57.4932C33.4473 56.7685 31.5191 55.7683 29.763 54.536C23.6054 50.2148 19.5695 43.0473 19.5695 34.9504C19.5695 26.8535 23.6054 19.686 29.763 15.3648C31.5189 14.1325 33.4473 13.1323 35.5042 12.4076C37.966 11.5403 40.6107 11.067 43.3639 11.067C46.1171 11.067 48.762 11.5404 51.2236 12.4076C53.2805 13.1323 55.2087 14.1325 56.9648 15.3648C63.1224 19.686 67.1583 26.8535 67.1583 34.9504C67.1583 43.0473 63.1224 50.2148 56.9648 54.536ZM72.4752 52.3537C72.4752 53.557 71.5001 54.5359 70.3013 54.5359H61.6275C66.8409 49.6349 70.1045 42.6684 70.1045 34.9503C70.1045 27.2321 66.8409 20.2656 61.6275 15.3647H62.2179H70.3013C71.5001 15.3647 72.4752 16.3435 72.4752 17.5468V52.3537Z" fill="#252525"/>
                <path d="M43.3633 15.5378C32.6993 15.5378 24.0234 24.2462 24.0234 34.9503C24.0234 45.6543 32.6993 54.3626 43.3633 54.3626C44.9171 54.3626 46.4637 54.1769 47.96 53.8106C48.7505 53.6171 49.2348 52.8172 49.0421 52.0239C48.8494 51.2305 48.0524 50.744 47.2621 50.9377C45.9939 51.2482 44.6821 51.4056 43.3633 51.4056C34.3238 51.4056 26.9696 44.0238 26.9696 34.9504C26.9696 25.8771 34.3238 18.4952 43.3633 18.4952C52.4028 18.4952 59.757 25.8769 59.757 34.9504C59.757 38.2575 58.7841 41.446 56.9432 44.1715C56.4867 44.8474 56.6626 45.7669 57.336 46.2252C58.0089 46.6832 58.9253 46.507 59.3819 45.831C61.5547 42.614 62.7031 38.8516 62.7031 34.9506C62.7031 24.2462 54.0273 15.5378 43.3633 15.5378Z" fill="#252525"/>
                <path d="M10.3561 20.4753C7.33157 20.4753 4.87109 22.9452 4.87109 25.9809C4.87109 29.0166 7.33172 31.4864 10.3561 31.4864C13.3805 31.4864 15.8411 29.0166 15.8411 25.9809C15.8411 22.9452 13.3805 20.4753 10.3561 20.4753ZM10.3561 28.5294C8.95622 28.5294 7.81724 27.3861 7.81724 25.981C7.81724 24.5759 8.95622 23.4327 10.3561 23.4327C11.7559 23.4327 12.8949 24.5759 12.8949 25.981C12.8949 27.3861 11.7561 28.5294 10.3561 28.5294Z" fill="#252525"/>
                <path d="M55.2539 49.2108C55.2346 49.1176 55.2067 49.0245 55.1698 48.9343C55.133 48.8456 55.0873 48.7598 55.0343 48.68C54.9814 48.5986 54.9194 48.5232 54.8516 48.4552C54.7839 48.3872 54.7074 48.3251 54.6277 48.2704C54.5467 48.2172 54.4613 48.1713 54.3729 48.1344C54.2845 48.0974 54.1919 48.0693 54.0976 48.0501C53.9076 48.0116 53.7116 48.0116 53.5216 48.0501C53.4272 48.0693 53.3344 48.0974 53.2461 48.1344C53.1576 48.1713 53.0723 48.2172 52.9913 48.2704C52.9118 48.3251 52.8366 48.3872 52.7674 48.4552C52.6996 48.5232 52.6378 48.5986 52.5847 48.68C52.5317 48.7598 52.486 48.8456 52.4492 48.9343C52.4124 49.0245 52.3844 49.1176 52.3652 49.2108C52.3461 49.3069 52.3359 49.4045 52.3359 49.5006C52.3359 49.5967 52.3461 49.6943 52.3652 49.7889C52.3844 49.8835 52.4124 49.9767 52.4492 50.0654C52.486 50.1556 52.5317 50.2414 52.5847 50.3212C52.6378 50.4025 52.6996 50.4779 52.7674 50.5459C52.8366 50.614 52.9116 50.6761 52.9913 50.7293C53.0725 50.7825 53.1578 50.8284 53.2461 50.8653C53.3345 50.9023 53.4272 50.9304 53.5216 50.9496C53.6172 50.9688 53.7131 50.9792 53.8089 50.9792C53.9059 50.9792 54.0018 50.9688 54.0976 50.9496C54.1919 50.9304 54.2847 50.9023 54.3729 50.8653C54.4614 50.8284 54.5469 50.7825 54.6277 50.7293C54.7073 50.6761 54.7839 50.614 54.8516 50.5459C55.1256 50.2709 55.2819 49.8894 55.2819 49.5006C55.2819 49.4045 55.2729 49.3069 55.2539 49.2108Z" fill="#252525"/>
            </svg>);
    }

    render(){
        return(
            <div className="empty_activity_root">
                <div className="empty_activity">
                    <div className="empty_image">
                        { this.chooseImage()}
                    </div>
                    <p className="empty_text">{this.props.e_title}</p>
                    <div className="empty_button"><Link to={this.props.e_path} className="theme-btn theme-btn-primary">{this.props.e_name}</Link></div>
                </div>
            </div>
        );
    }
}

export default EmptyActivity;