interface KeyFeatureProps {
  keyFeature: string;
  feature: string;
  description: string;
}
const KeyFeature: React.FC<KeyFeatureProps> = ({
  feature,
  description,
  keyFeature
}) => {
  return (
    <div className="">
      <li className="font-thin">
        <span className="font-bold italic text-lightBlue">{keyFeature}</span> {feature}
      </li>
      <p className="ml-5 text-gray-500 font-thin">
        {description}
      </p>
    </div>
  );
};

export default KeyFeature;
