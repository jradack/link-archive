import xmltojson 
import json
import datetime

# Parse html file and convert ot JSON
def open_html(f_name):
    with open(f_name, "r") as html_file:
        html = html_file.read()
        json_ = xmltojson.parse(html)
    links = json.loads(json_)
    return(links)

# Function for processing a link
def process_link(link, source, read_bool):
    link_clean = link['a'].copy()
    link_clean['name'] = link_clean.pop('#text')
    link_clean['original_url'] = link_clean.pop('@href')
    link_clean['archive_link'] = None
    link_clean['date_saved'] = link_clean.pop('@time_added')
    date_time_saved = datetime.datetime(1970, 1, 1) + datetime.timedelta(seconds = int(link_clean['date_saved']))
    link_clean['date_saved'] = date_time_saved.strftime('%Y-%m-%d')
    link_clean['date_read'] = None
    link_clean['read'] = read_bool
    link_clean['tags'] = link_clean.pop('@tags')
    if link_clean['tags'] == '':
        link_clean['tags'] = [source]
    else:
        link_clean['tags'] = [source] + link_clean['tags'].split(",")
    return link_clean


# Write JSON to file
def write_json(links, f_out):
    with open(f_out, "w") as json_file:
        json.dump(links, json_file, indent = 1)


# Get lists of links - Pocket
def clean_pocket(f_out):
    pocketFilePath = "data/raw/ril_export_20230411.html"
    pocketLinks = open_html(pocketFilePath)

    pocketUnreadLinksList = pocketLinks['html']['body']['ul'][0]['li']
    pocketReadLinksList = pocketLinks['html']['body']['ul'][1]['li']

    pocketUnreadLinksListClean = [process_link(i, 'pocket', False) for i in pocketUnreadLinksList]
    pocketReadLinksListClean = [process_link(i, 'pocket', True) for i in pocketReadLinksList]

    pocketLinksListClean = pocketUnreadLinksListClean + pocketReadLinksListClean
    write_json(pocketLinksListClean, f_out)


# Get lists of links - Reddit
def clean_reddit(f_out):
    redditFilePath = "data/raw/reddit-export-saved-edit_20240421.html"
    redditLinks = open_html(redditFilePath)

    redditLinksList = redditLinks['html']['ul']['li']

    redditLinksListClean = [process_link(i, 'reddit', False) for i in redditLinksList]
    write_json(redditLinksListClean, f_out)

# 
def main():
    clean_pocket("data/cleaned/pocket_data.json")
    clean_reddit("data/cleaned/reddit_data.json")

if __name__ == "__main__":
    main()