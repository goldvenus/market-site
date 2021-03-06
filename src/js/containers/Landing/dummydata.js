import React from 'react';
import {Link} from 'react-router-dom';

const metas = {
  '/': {
    title: 'Creative Market',
  },
  '/about-us': {
    title: 'About Us',
    keywords: 'rent,creative,gear,renting,market,camera',
    description: 'Cameras, Musical Instruments, Lights and anything else that comes to mind, Creative Market is the place to find it.',
    'og:title': 'Rent creative gear from the people around you. Rent and share gear with creative market.',
    'og:description': 'With Creative Market, you can rent any gear you might need from other creatives around you. Allow others to rent from you at the same time.',
    'og:type': 'website',
    'og:image': '',
    'og:locale': 'en-us',
    'og:url': '',
    'og:site_name': 'creative.market',
  },
  '/faq': {
    title: 'Frequently Asked Questions',
    keywords: 'rent,creative,gear,renting,market,camera',
    description: 'Cameras, Musical Instruments, Lights and anything else that comes to mind, Creative Market is the place to find it.',
    'og:title': 'og:description',
    'og:description': '',
    'og:type': 'website',
    'og:image': '',
    'og:locale': 'en-us',
    'og:url': '',
    'og:site_name': 'creative.market',
  },
  '/rent-gear': {
    title: 'Rent Creative Gear',
    keywords: 'rent,creative,gear,renting,market,camera',
    description: 'Rent creative gear from the people around you. Rent and share gear with creative market.',
    'og:title': 'og:description',
    'og:description': '',
    'og:type': 'website',
    'og:image': '',
    'og:locale': 'en-us',
    'og:url': '',
    'og:site_name': 'creative.market',
  },
  '/gear/detail': {
    title: 'Gear Information',
    keywords: 'rent,creative,gear,renting,market,camera',
    description: 'Cameras, Musical Instruments, Lights and anything else that comes to mind, Creative Market is the place to find it.',
    'twitter:card': 'summary',
    'twitter:site': '@creativemarket',
    'og:title': 'og:description',
    'og:description': '',
    'og:type': 'website',
    'og:image': '',
    'og:locale': 'en-us',
    'og:url': '',
    'og:site_name': 'creative.market',
  }
};

const faqs = [
  {
    title: 'Getting started',
    content: 'Before you can engage in rentals on Creative Market, you must first register an account, provide the required information and accept the Terms of Service.'
  },
  {
    title: 'How do I rent gear?',
    content: <span>To rent gear, you simply head over to <Link to="/rent-gear?type=all" style={{textDecoration: 'underline'}}>RENT GEAR</Link>, and search for what you’re looking for. Once you find it, select your rental period and add the gear to your cart. After you proceed to checkout, we will ask you to create a project name, in case you might be renting more than one item from more than one owner at once. After that, we will require a full payment, which will be securely held in escrow and only released to the gear owner once both parties have confirmed that the gear has been picked up.</span>
  },
  {
    title: 'How do I list my own gear for rent?',
    content: <span>To list your own gear for rent, you simply head over to the <Link to="/add-gear" style={{textDecoration: 'underline'}}>ADD GEAR</Link> page and fill in all the required information. We kindly ask gear owners to use real photos of their own gear, rather than photos of similar gear found online. After completing all the steps, your gear should instantly be live and available for rent on Creative Market. And remember, you can always head over to <Link to="/dashboard?page=my-gear" style={{textDecoration: 'underline'}}>MY GEAR</Link> if you want to edit or remove gear.</span>
  },
  {
    title: 'How much does it cost to list gear for rent?',
    content: 'Creative Market is free to join and has no membership fees or monthly fees. It is also free to list gear. We only make money when you make money. We charge a 6% service fee to owners and 6% service fee to renters of each transaction. This helps cover payment processing, security, hosting, development and more.'
  },
  {
    title: 'Do renters pay before or after the rental period?',
    content: 'Once you’ve found the right gear, we will ask you to submit a full credit card payment to confirm the rental. Your funds will be securely held in escrow and only released to the gear owner once both parties have confirmed that the gear has been picked up.'
  },
  {
    title: 'How do gear owners get paid?',
    content: 'Owners can request to get paid at any time once funds appear in their account balance. This usually happens within 24 hours after a rental has been completed successfully. Payouts are then wire-transferred automatically to verified SWIFT/BIC accounts through our payment partner MangoPay.'
  },
  {
    title: 'How do renters and owner communicate?',
    content: <span>Once a rental has been confirmed by the renter’s payment, a conversation will automatically open up within <Link to="/messages" style={{textDecoration: 'underline'}}>MESSAGES</Link>. This allows both parties to easily communicate throughout the entire rental period. For safety and legal reason, we insist that all members follow our Terms of Service and exclusively communicate through the Creative Market platform during the rental period.</span>
  },
  {
    title: 'Where do renters pickup and return gear?',
    content: <span>As long as gear pickup and return take place during the agreed rental period, specific time and location details are entirely up to you. Renters and Owners can easily coordinate on these matters within <Link to="/messages" style={{textDecoration: 'underline'}}>MESSAGES</Link>. If both parties fail to agree on a pickup time/location, rentals can be canceled and a full refund issued to the renter within 48 hours.</span>
  },
  {
    title: 'What if the owner fails to show up or deliver gear?',
    content: 'If the owner fails to show up or deliver the gear, rentals can be instantly canceled and a full refund issued to the renter within 48 hours.'
  },
  {
    title: 'What if the renter fails to return gear?',
    content: 'In the case of an unresponsive renter which fails to return gear at the end of a rental period, Creative Market will take measures to assist owners in reclaiming their gear. Firstly, an attempt will be made to charge additional rental days with 7% late fees, for up to 7 days, from the renter’s registered payment method. If the renter is still unresponsive on the 8th day, an attempt will be made to charge the full replacement value of the gear, from the renter’s registered payment method.'
  },
  {
    title: 'Damage, Safety, and Disputes',
    content: <span>Creative Market solely serves as a limited agent and offers a platform through which the renters and owners can digitally communicate and execute Gear rentals. As stated in the <Link to="/terms-use" style={{textDecoration: 'underline'}}>Terms of Service</Link>, both renters and owners agree and acknowledge that Creative Market is not offering or inspecting any gear that you rent through our platform. Therefore cannot make any warranties and representations about the quality and safety of the gear. All legal claims in relation to the renting of gear must be brought directly against the other party. We always recommend to first contact the other party through <Link to="/messages" style={{textDecoration: 'underline'}}>MESSAGES</Link> and make an attempt to resolve the dispute amicably.</span>
  },
  {
    title: 'Owner insurance and liability ',
    content: 'Apart from the case described in “What if the renter fails to return gear?”, owners are solely responsible for purchasing the proper insurance that covers theft or voluntary parting and damages to their gear. As an owner, you acknowledge and agree that Creative Market will solely act as an intermediary, and not as an insurer or contracting agency. Creative Market will never cover the Renter’s failure to return your Gear. By adding gear and accepting the Terms of Service, the owner acknowledges and agrees he/she may suffer a loss as a consequence of renting out the gear.'
  }
];

export {faqs, metas};