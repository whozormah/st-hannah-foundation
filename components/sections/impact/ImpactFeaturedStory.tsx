export default function ImpactFeaturedStory() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}

          <div className="relative">
            <img
              src="/impact/featured-story.png"
              alt="Featured Impact Story"
              className="w-full h-[550px] object-cover rounded-[32px]"
            />
          </div>

          {/* Content */}

          <div>
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Featured Story
            </span>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Transforming Lives Through Compassion And Action
            </h2>

            <p className="mt-8 text-gray-600 leading-8">
              Through the support of donors, volunteers and partners, St. Hannah
              Foundation continues to provide meaningful assistance to widows,
              families, students and vulnerable individuals across communities.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Every intervention represents more than support—it represents
              renewed hope, restored dignity and a pathway to a better future.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="bg-[#FAF7F2] p-6 rounded-2xl">
                <h3 className="text-3xl font-bold text-[#844204]">500+</h3>

                <p className="text-gray-600 mt-2">Lives Impacted</p>
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-2xl">
                <h3 className="text-3xl font-bold text-[#844204]">100+</h3>

                <p className="text-gray-600 mt-2">Families Supported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
