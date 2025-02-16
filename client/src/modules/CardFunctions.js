// import Components
import Card from '../components/Card';

export const buildCards = function (cardData) {
    return Array.from(cardData).map((card, index) => (
        <Card key={index} image={card.img} imageAbout={card.imageAbout} heading={card.heading} content={card.content} buttonField={card.buttonField} buttonLink={card.buttonLink} />
    ));
};
