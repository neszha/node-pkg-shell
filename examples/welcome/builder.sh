# ###
# The builder only works on the linux kernel. [Windows using git bash]
# ###

# # Configurations: Applications.
VERSION="1.0.0"
SCRIPTS=("index.js")
ASSETS=("")

# # Configurations: Builder.
TARGET_NODE_RANGE="node18"              # node8, node10, node12, node14, node16, or [node18] 
TARGET_PLATFORMS=("linux" "win")        # alpine, linux, linuxstatic, win, and macos
TARGET_ARCH="x64"                       # arm64 or [x64]
OUTPUT_PATH="bin"

# # Prepare NPM global packages.
# npm install -g pkg
# npm install -g @vercel/ncc

# # Install dependencies project.
npm install

# # Remove building temporary dir/file.
rm -r _ncc*
rm -r bin

# # Bundle scripts using @vercel/ncc.
ncc cache clean
for script in "${SCRIPTS[@]}"
do  
    ncc_out_dir="_ncc_${script//.js/}"
    mkdir "$ncc_out_dir"
    ncc build "$script" -m -o "$ncc_out_dir" &
done
wait

# # Compile to binary file using @vercel/pkg.
for script in "${SCRIPTS[@]}"
do  
    script_name="index.js"
    ncc_dir="_ncc_${script//.js/}"
    script_path="${ncc_dir}/${script_name}"
    for platform in "${TARGET_PLATFORMS[@]}"
    do 
        app_name="${script//.js/}-${VERSION}"
        target="${TARGET_NODE_RANGE}-${platform}-${TARGET_ARCH}"
        output="${OUTPUT_PATH}/${platform}/${app_name}"
        command="pkg ${script_path} --target ${target} --output ${output}"
        eval "${command}" 
        echo "${command}"
    done
done

# # Remove building temporary dir/file.
rm -r _ncc*

# # Done.
exit 0
