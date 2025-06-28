document.addEventListener('DOMContentLoaded', () => {
    // const thumbnailData = [
    //     'koala', 'mbike-trick', 'schoolgirls', 'dog-gooses', 
    //     'goat', 'rhino', 'crossing', 'elephant',
    //     'drift-chicane', 'bear', 'judo', 'bike-packing'
    // ];
    // https://easi3r.github.io/static/thumbs/${name}.jpg
    // https://easi3r.github.io/static/videos/mask/${name}.mp4

    const thumbnailData = [
        'HKU_HDR_circle_27.39_30.09',
        'dsec_zurich_city_04_b_1.50_6.45',
        'indoor_forward_3_davis_with_gt_32.81_36.94',
        'dynamic_6dof_15.75_20.40',
        'dsec_zurich_city_04_c_1.20_6.15',
        'hdr_boxes_28.31_32.58',
        'dsec_zurich_city_04_e_1.05_6.00',
        'hku_aggressive_walk_26.39_30.70',
        'hku_dark_normal_27.42_31.71',
        'indoor_forward_5_davis_with_gt_33.07_38.24',
        'indoor_forward_7_davis_with_gt_35.46_40.36',
        'mocap-1d-trans_8.62_13.57',
        'mocap-6dof_7.34_12.29',
        'mocap-desk_9.11_14.06',
        'HKU_aggressive_small_flip_24.06_28.35',
        'poster_6dof_29.69_34.06',
    ];

    const thumbnailsHtml = thumbnailData.map(name => `
        <img src="https://demo-eio.github.io/media/Patch_Selection/${name}.png" 
             data-video="https://demo-eio.github.io/media/Patch_Selection/col6/${name}.mp4"
             class="thumbnail mask-thumbnail" 
             alt="${name}" 
             style="cursor: pointer; width: 100px;">
    `).join('');

    const content = `
        <div class="container is-max-desktop">
            <div class="columns is-centered has-text-centered">
                <div class="column is-full panel-style">
                    <h2 class="title is-4">Visualization of the Patch Selection</h2>
                    <p style="max-width: 90%; margin: 0 auto; text-align: left;">
                        We visualize the selected event patch and the estimated score map form DEMO, along with the event voxel (input), image (only for visualization), the feature space for event-based optical flow prediction, and also the estimated trajectory.
                    </p>
                    <br>
                    <div class="video-container">
                        <div class="video-labels">
                            <span class="video-label">Event Voxel</span>
                            <span class="video-label">Image View</span>
                            <span class="video-label">Feature Map</span>
                            <span class="video-label">Score Map</span>
                            <span class="video-label">Selected Patch</span>
                            <span class="video-label">Trajectory</span>
                        </div>
                        <div id="mask-video-container" style="width: 100%; position: relative; aspect-ratio: 4678/532;">
                            <video id="mask-video" autoplay muted loop playsinline disablePictureInPicture controlsList="nodownload nofullscreen" style="width: 150%; height: auto;">
                                <source id="mask-video-source" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="thumbnail-container">
                        ${thumbnailsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .thumbnail {
            border-radius: 6px;
            border: 2px solid #fff;
            box-shadow: 0 0 4px #888;
            width: 100px;
            height: 70px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        .thumbnail:hover { transform: scale(1.1); }
    `;
    document.head.appendChild(style);

    const section = document.getElementById('patch-vis');
    section.innerHTML = content;
    section.style.display = 'block';

    const videoElement = document.getElementById('mask-video');
    const videoSource = document.getElementById('mask-video-source');
    const thumbnails = document.querySelectorAll('.mask-thumbnail');

    thumbnails[0].style.border = '3px solid #92A8D1';
    videoSource.src = thumbnails[0].dataset.video;
    videoElement.load();

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            thumbnails.forEach(t => t.style.border = '2px solid #fff');
            thumbnail.style.border = '3px solid #92A8D1';
            
            videoSource.src = thumbnail.dataset.video;
            videoElement.load();
            videoElement.play();
        });
    });

    videoElement.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
});
