export function Description() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          IIT Madras is a <span className="font-semibold">premium technical university</span> that was{" "}
          <span className="font-semibold">established in 1959</span> in Chennai, Tamil Nadu. It ranked{" "}
          <span className="font-semibold">#1</span> among{" "}
          <span className="font-semibold">Engineering Universities in India</span>, under the NIRF Ranking 2025.
        </p>

        <p>
          IITM offers undergraduate, postgraduate, and doctoral degrees in Engineering, Management, and Science. The MBA
          course is offered through the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            DoMS, IIT Madras
          </a>
          .{" "}
          <span className="font-semibold">
            Admissions are based on JEE Advanced, GATE, IIT JAM, and CAT scores for various courses
          </span>
          . The Indian Institute of Technology Madras features a big and diverse faculty of{" "}
          <span className="font-semibold">630 members</span> across all academic departments, with PhD degrees in their
          respective professions.
        </p>

        <p>
          IIT Madras{" "}
          <a href="#" className="text-blue-600 hover:underline">
            placements
          </a>{" "}
          saw admirable{" "}
          <a href="#" className="text-blue-600 hover:underline">
            placement percentages
          </a>
          , and the <span className="font-semibold">average package</span> offered to students was{" "}
          <span className="font-semibold">INR 22 LPA</span> during the 2024 placement procedure.
        </p>
      </div>

      <button className="mt-6 text-[#ff5722] font-medium hover:underline w-full text-center">Show More</button>
    </div>
  )
}
