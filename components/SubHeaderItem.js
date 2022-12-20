import Image from "next/image";

const SubHeaderItem = (props) => {
  return (
    <div className="ml-3 flex items-center justify-center rounded-md py-1 px-2 transition duration-150 hover:cursor-pointer hover:bg-gray-100 hover:ease-in" onClick={props.onClick}>
      <Image className="text-gray-600" src={props.icon} />
      <p className="ml-3 text-sm text-neutral-800">{props.action}</p>
    </div>
  );
};

export default SubHeaderItem;
